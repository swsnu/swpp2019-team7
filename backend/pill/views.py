from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json

from django.contrib.auth import login, logout, authenticate

from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Article, Comment
from .serializers import ArticleSerializer, CommentSerializer

class PillItemsPerUser(APIView):
    # url:  pill/user/<int:pk>/
    def get(self):
        # get pill list for user <int:pk>
        pass

    def post(self):
        # add new pill item for user <int:pk>
        pass