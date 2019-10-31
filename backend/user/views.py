from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseForbidden, HttpResponseNotFound, HttpResponseBadRequest
import json
from .models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

# Create your views here.


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, ValueError) as e:
            return HttpResponseBadRequest()
        user = authenticate(request, email=email, password=password)
        print('Does it work?')
        print(user)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(content='user is None', status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def signout(request):
    if request.method == 'GET':
        print(request.user)
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
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
            name = req_data['name']
        except (KeyError, ValueError) as e:
            return HttpResponseBadRequest()
        User.objects.create_user(email=email, password=password, name = name)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def userInfo(request, id):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        elif not User.objects.filter(id=id).exists():
            return HttpResponseNotFound()
        else:
            user = User.objects.get(id=id)
            response_dict = {'email': user.email,
                             'password': user.password, 'name': user.name, 'register-date': user.register_date, 'last-login-date': user.last_login_date}
            return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
