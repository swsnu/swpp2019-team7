from django.http import HttpResponse, HttpResponseNotAllowed, \
    JsonResponse, HttpResponseNotFound, HttpResponseBadRequest #HttpResponseForbidden
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
# from django.contrib.auth.models import User
# from django.views.decorators.csrf import ensure_csrf_cookie
# import json
#
# from django.contrib.auth import login, logout, authenticate
#
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.authentication import SessionAuthentication

from .models import Pill


# url:  api/pill/pill_id
class PillItemsPerUser(APIView):
    """List of pill items per user"""

    # @csrf_exempt
    def get(self, request):
        """ get pill list for request.user  """
        print('backend GET request called\nuser: ', request.user)
        if request.user.is_authenticated:
            print('backend user authenticated')
            # saved_pills = get_object_or_404(request.user.pills.all())
            # TODO handle when request.user has no pills  (aka when saved_pills = empty QuerySet)
            saved_pills = request.user.pills.all()
            print('saved_pills: ', saved_pills)
            # <QuerySet [<Pill: 마이락토 씨 플러스(MYLACTO C PLUS)>, <Pill: 마이락토 씨(MYLACTO C)>]>
            return_list = []
            for pill in saved_pills:
                print(f'pill {pill.id}: {pill.product_name}')
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
            # serialized_pills = PillItemsPerUserSerializer(saved_pills)
            # return Response(serialized_pills.data, status=200)
            # return Response(status=200)
        else:
            return HttpResponse(status=401)

    # @csrf_exempt
    def post(self, request, pill_id):
        """ add new pill item for user <int:pk> """
        print('backend POST request called\nuser: ', request.user)
        if request.user.is_authenticated:
            print('backend user authenticated')
            new_pill = Pill.objects.get(pk=pill_id)     # get pill object from Pill model by id
            print('new_pill: ', new_pill)
            # add retrieved pill object to current user's pills field
            request.user.pills.add(new_pill)
            # return Response({"product name": new_pill.product_name}, status=200)
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
            # TODO return updated pill list & status code
            saved_pills = request.user.pills.all()
            print('saved_pills: ', saved_pills)
            # # saved_pills = request.user.pills.all()
            # serialized_pills = PillItemsPerUserSerializer(saved_pills)
            # return Response(serialized_pills.data, status=200)
            return JsonResponse(new_pill_dict, status=201)
        else:
            return HttpResponse(status=401)

    # @csrf_exempt
    # pylint: disable=R0201
    def delete(self, request, pill_id):
        """TODO: ADDCOMMENT Delete pill from list"""
        if request.user.is_authenticated:
            new_pill = Pill.objects.get(id=pill_id)
            request.user.pills.remove(new_pill)
            # TODO return updated pill list & status code
            return Response(status=204)
        else:
            return HttpResponse(status=401)
