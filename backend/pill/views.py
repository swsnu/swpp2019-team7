import json

from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework import status

from vision.models import Image
from notification.models import Notification
from .models import Pill, CustomPill

# url:  api/pill/


def get_pill_dict(pill, image_instance=''):
    """Get pill object and return dictionary of it"""
    file = ''
    if image_instance:
        file = image_instance.content.url
    pill_dict = {
        "id": pill.id,
        "take_method": pill.take_method,
        "product_name": pill.product_name,
        "expiration_date": pill.expiration_date,
        "functions": pill.functions,
        "store_method": pill.store_method,
        "company_name": pill.company_name,
        "standards": pill.standards,
        "precautions": pill.precautions,
        "take_method_preprocessed": pill.take_method_preprocessed,
        "file": file,
    }
    return pill_dict


def get_user_pills(request):
    """Description of API to get list of pills for given user"""
    if request.method == 'GET':
        """ get pill list for request.user  """
        if request.user.is_authenticated:
            saved_pills = request.user.pills.all()
            print(f'saved_pills {saved_pills}')
            print(f'all images view{Image.objects.all()}')
            return_list = []
            for pill in saved_pills:
                image_instance = Image.objects.filter(user=request.user, pill=pill)[0]
                print(image_instance)
                pill_dict = get_pill_dict(pill, image_instance)
                return_list.append(pill_dict)
            return JsonResponse(return_list, status=200, safe=False)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


# url:  api/pill/pill_id
class PillItemsPerUser(APIView):
    """Define view for specific pill. pill_id is a global, DB wise index, not within user"""

    def post(self, request, pill_id):
        """ add new pill item for user <int:pk> """
        if request.user.is_authenticated:
            # check if pill_id already exists in user's pills
            existing_pills = request.user.pills.all().values_list('id', flat=True)
            if pill_id in existing_pills:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            # get pill object from Pill model by id
            new_pill = Pill.objects.get(pk=pill_id)
            # add retrieved pill object to current user's pills field
            request.user.pills.add(new_pill)
            # add notification for the new pill
            Notification.create(request.user, new_pill)

            new_pill_dict = get_pill_dict(new_pill)
            return JsonResponse(new_pill_dict, status=status.HTTP_201_CREATED)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)

    # @csrf_exempt
    # pylint: disable=R0201
    def delete(self, request, pill_id):
        """ Delete pill_id """
        if request.user.is_authenticated:
            # don't delete pill_id twice
            existing_pills = request.user.pills.all().values_list('id', flat=True)
            if pill_id not in existing_pills:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            new_pill = Pill.objects.get(id=pill_id)

            # remove notification for the deleted pill
            Notification.objects.filter(
                user=request.user, pill=new_pill).delete()
            request.user.pills.remove(new_pill)
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)

    # @csrf_exempt
    # pylint: disable=R0201
    def get(self, request, pill_id):
        """ Get specific pill of pill_id from this user"""
        if request.user.is_authenticated:
            # Check if user has pill_id
            existing_pills = request.user.pills.all().values_list('id', flat=True)
            if pill_id not in existing_pills:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            selected_pill = Pill.objects.get(id=pill_id)
            pill_dict = get_pill_dict(selected_pill)
            # remove notification for the deleted pill
            return JsonResponse(pill_dict, status=200, safe=False)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)

# url:  api/pill/pill_id
class CustomPillItem(APIView):
    """Define view for specific pill. pill_id is a global, DB wise index, not within user"""

    def post(self, request):
        """ add new pill item for user <int:pk> """
        if request.user.is_authenticated:
            # check if pill_id already exists in user's pills
            try:
                pill_data = json.loads(request.body.decode())
                take_method = pill_data['take_method']
                product_name = pill_data['product_name']
                expiration_date = pill_data['expiration_date']
                functions = pill_data['functions']
                store_method = pill_data['store_method']
                company_name = pill_data['company_name']
                standards = pill_data['standards']
                precautions = pill_data['precautions']
                take_method_preprocessed = pill_data['take_method_preprocessed']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            existing_pills = request.user.pills.all().values_list('product_name', flat=True)
            if product_name in existing_pills:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            # get pill object from Pill model by id
            new_pill = CustomPill.objects.create(
                user=request.user,
                take_method=take_method,
                product_name=product_name,
                expiration_date=expiration_date,
                functions=functions,
                store_method=store_method,
                company_name=company_name,
                standards=standards,
                precautions=precautions,
                take_method_preprocessed=take_method_preprocessed
            )
            # add retrieved pill object to current user's pills field
            request.user.pills.add(new_pill)
            # add notification for the new pill
            Notification.create(request.user, new_pill)

            new_pill_dict = get_pill_dict(new_pill)
            return JsonResponse(new_pill_dict, status=status.HTTP_201_CREATED)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
