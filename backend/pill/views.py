import json
import shortuuid
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework import status

from vision.models import Image
from notification.models import Notification
from .models import Pill

# url:  api/pill/

def _get_file_id():
    return shortuuid.uuid()

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
                print('pill is ')
                print(pill.pk)
                image_query = Image.objects.filter(
                    user=request.user, pill=pill)
                if image_query.exists():
                    image_instance = image_query[0]
                    print('image_instance is ')
                    print(image_instance)
                    pill_dict = get_pill_dict(pill, image_instance)
                else:
                    pill_dict = get_pill_dict(pill)
                return_list.append(pill_dict)
            return JsonResponse(return_list, status=200, safe=False)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_pill_list(request):
    '''This method is for the autosuggestion used in manual lookup. This returns all pill`s product name and id'''
    if request.method == 'GET':
        if request.user.is_authenticated:
            fetched_pills_list = [(pill['product_name'], pill['company_name'])
                                  for pill in Pill.objects.all().values()]
            return JsonResponse(fetched_pills_list, status=200, safe=False)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


def register_pill_by_name(request):
    '''This method is for the autosuggestion used in manual lookup. This method is for registering pills using the name, not the id'''
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                req_data = json.loads(request.body.decode())
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            pill_name = req_data['pill_name']
            new_pill = Pill.objects.get(product_name=pill_name)
            request.user.pills.add(new_pill)
            Notification.create(request.user, new_pill)
            new_pill_dict = get_pill_dict(new_pill)
            return JsonResponse(new_pill_dict, status=status.HTTP_201_CREATED)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

def post_pill_photo(request, pill_id):
    '''This method is for registering the pill photo in case the pill was added manually and doesn't have a photo'''
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                print('trying')
                print(request.FILES['pillImage'])
                req_data = request.FILES['pillImage']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            print('SUCCESS TO HERE!')
            pill = Pill.objects.get(pk=pill_id)
            print(pill)
            image_instance = Image(filename=_get_file_id(), content=req_data, user=request.user, pill=pill)
            image_instance.save()
            pill_dict = get_pill_dict(pill, image_instance)
            return JsonResponse(pill_dict, status=201)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

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
        """ Get pill of user of pill_id """
        if request.user.is_authenticated:
            # Check if user has pill_id
            existing_pills = request.user.pills.all().values_list('id', flat=True)
            if pill_id not in existing_pills:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            selected_pill = Pill.objects.get(id=pill_id)

            image_query = Image.objects.filter(
                user=request.user, pill=selected_pill)
            if image_query.exists():
                image_instance = image_query[0]
                print('image_instance is ')
                print(image_instance)
                pill_dict = get_pill_dict(selected_pill, image_instance)
            else:
                pill_dict = get_pill_dict(selected_pill)
            return JsonResponse(pill_dict, status=200, safe=False)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
