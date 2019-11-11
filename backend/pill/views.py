from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Pill


# url:  api/pill/pill_id
class PillItemsPerUser(APIView):
    """
    API Views associated with pill items per each user
    """

    def get(self, request, pill_id):
        """ get pill list for request.user """
        if request.user.is_authenticated:
            saved_pills = request.user.pills.all()

            return_list = []
            for pill in saved_pills:
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
                    "take_method_preprocessed": pill.take_method_preprocessed
                }
                return_list.append(pill_dict)
            return JsonResponse(return_list, status=200, safe=False)
        else:
            return HttpResponse(status=401)

    def post(self, request, pill_id):
        """ add new pill item for user <int:pk> """
        if request.user.is_authenticated:
            # check if pill_id already exists in user's pills
            existing_pills = request.user.pills.all().values_list('id', flat=True)
            if pill_id in existing_pills:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            new_pill = Pill.objects.get(pk=pill_id)  # get pill object from Pill model by id
            request.user.pills.add(new_pill)  # add retrieved pill object to current user's pills field

            new_pill_dict = {
                "id": new_pill.id,
                "take_method": new_pill.take_method,
                "product_name": new_pill.product_name,
                "expiration_date": new_pill.expiration_date,
                "functions": new_pill.functions,
                "store_method": new_pill.store_method,
                "company_name": new_pill.company_name,
                "standards": new_pill.standards,
                "precautions": new_pill.precautions,
                "take_method_preprocessed": new_pill.take_method_preprocessed
            }
            return JsonResponse(new_pill_dict, status=status.HTTP_201_CREATED)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pill_id):
        """ Deletes given pill from the user """
        if request.user.is_authenticated:
            # don't delete pill_id twice
            existing_pills = request.user.pills.all().values_list('id', flat=True)
            if pill_id not in existing_pills:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

            new_pill = Pill.objects.get(id=pill_id)
            request.user.pills.remove(new_pill)
            return Response(status=204)
        else:
            return HttpResponse(status=401)
