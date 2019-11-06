# from django.http import HttpResponse, HttpResponseNotAllowed
# from django.contrib.auth.models import User
# from django.views.decorators.csrf import ensure_csrf_cookie
# import json
#
# from django.contrib.auth import login, logout, authenticate
#
# from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
# from rest_framework.response import Response
# from .models import Pill
# from .serializers import ArticleSerializer, CommentSerializer


# pill / user / < int: pk > /
class PillItemsPerUser(APIView):
    def get(self):
        # get pill list for user <int:pk>
        pass

    def post(self):
        # add new pill item for user <int:pk>
        pass


class PillItemsByPillId(APIView):
    def put(self):
        pass

    def delete(self):
        pass
