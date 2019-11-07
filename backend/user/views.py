import json

from django.shortcuts import render
#TODO_ERASE
from django.http import HttpResponse, HttpResponseNotAllowed, \
    JsonResponse, HttpResponseNotFound, HttpResponseBadRequest #HttpResponseForbidden
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
import ipdb

from .models import User
# Create your views here.


@csrf_exempt
def signin(request):
    """REST API description of /api/signin"""
    """POST: recieve user authentication and see if registered. Return 204 response"""
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, ValueError):
            return HttpResponseBadRequest()
        user = authenticate(request, email=email, password=password)
        # print('Does it work?')
        if user is not None:
            login(request, user)
            ipdb.set_trace()
            # print('request session: ', request.session)
            # print(request.user, request.user.is_authenticated)
            return HttpResponse(status=204)
        else:
            return HttpResponse(content='user is None', status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def signout(request):
    """REST API description of /api/signout"""
    """GET: Signs out the user. Return 204 response"""
    if request.method == 'GET':
        # print('singout django: ', request.user)
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        print('not get?')
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def signup(request):
    """REST API description of /api/singup"""
    """POST: Recieves and registers info of new user. Return 201 response"""
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
            name = req_data['name']
        except (KeyError, ValueError):
            return HttpResponseBadRequest()
        print("User is {} {} {}".format(email, password, name))
        User.objects.create_user(email=email, password=password, name=name)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def user_info(request, user_id):
    """GET: returns information of User in dictionary. Return dict with 200"""
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        elif not User.objects.filter(id=user_id).exists():
            return HttpResponseNotFound()
        else:
            user = User.objects.get(id=user_id)
            response_dict = {'email': user.email,
                             'password': user.password,
                             'name': user.name,
                             'register-date': user.register_date,
                             'last-login-date': user.last_login_date}
            return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    """CSRF token provider"""
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
