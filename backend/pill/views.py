from django.http import HttpResponse, HttpResponseNotAllowed
# from django.contrib.auth.models import User
# from django.views.decorators.csrf import ensure_csrf_cookie
# import json
#
# from django.contrib.auth import login, logout, authenticate
#
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Pill
from .serializers import PillItemsPerUserSerializer


# url:  api/pill/pill_id
class PillItemsPerUser(APIView):
    def get(self, request):
        """ get pill list for user <int:pk> """
        if request.user.is_authenticated:
            print('request.user: ', request.user)
            saved_pills = get_object_or_404(request.user.pills)
            serialized_pills = PillItemsPerUserSerializer(saved_pills)
            return Response(serialized_pills.data, status=200)
        else:
            return HttpResponse(status=401)

    def post(self, request, pill_id):
        """ add new pill item for user <int:pk> """
        if request.user.is_authenticated:
            new_pill = Pill.objects.get(id=pill_id)     # get pill object from Pill model by id
            request.user.pills.add(new_pill)        # add retrieved pill object to current user's pills field
            # TODO return updated pill list & status code
        else:
            return HttpResponse(status=401)

    def delete(self, request, pill_id):
        if request.user.is_authenticated:
            new_pill = Pill.objects.get(id=pill_id)
            request.user.remove(new_pill)
            # TODO return updated pill list & status code
        else:
            return HttpResponse(status=401)