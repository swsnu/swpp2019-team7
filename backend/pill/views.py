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
from rest_framework.authentication import SessionAuthentication

from .models import Pill

from .serializers import PillItemsPerUserSerializer

@csrf_exempt
def user_pills(request):
    if request.method == 'GET':
        print('session: ', request.session.session_key)
        try:
            if request.user.is_authenticated:
                # saved_pills = get_object_or_404(request.user.pills)
                # serialized_pills = PillItemsPerUserSerializer(saved_pills)
                # return Response(serialized_pills.data, status=200)
                return HttpResponse(status=200)
            else:
                return HttpResponse(status=401)
        except (KeyError, ValueError):
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['GET'])
# url:  api/pill/pill_id
# class PillItemsPerUser(APIView):
#     authentication_classes = [SessionAuthentication]
#
#     @csrf_exempt
#     def get(self, request):
#         """ get pill list for user <int:pk> """
#         if request.user.is_authenticated:
#             saved_pills = get_object_or_404(request.user.pills)
#             serialized_pills = PillItemsPerUserSerializer(saved_pills)
#             return Response(serialized_pills.data, status=200)
#         else:
#             return HttpResponse(status=401)
#
#     def post(self, request, pill_id):
#         """ add new pill item for user <int:pk> """
#         if request.user.is_authenticated:
#             new_pill = Pill.objects.get(id=pill_id)     # get pill object from Pill model by id
#             request.user.pills.add(new_pill)        # add retrieved pill object to current user's pills field
#             # TODO return updated pill list & status code
#         else:
#             return HttpResponse(status=401)
#
#     def delete(self, request, pill_id):
#         if request.user.is_authenticated:
#             new_pill = Pill.objects.get(id=pill_id)
#             request.user.remove(new_pill)
#             # TODO return updated pill list & status code
#         else:
#             return HttpResponse(status=401)