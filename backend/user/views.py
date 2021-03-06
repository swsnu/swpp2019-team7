import json

from django.http import HttpResponse, HttpResponseNotAllowed, \
    JsonResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.forms import PasswordChangeForm

from notisetting.models import NotiSetting

from .models import User
# Create your views here.


def format_user_object(user):
    """Recieves user model instance and returns JSON of it """
    return {
        'id': user.id,
        'email': user.email,
        'password': user.password,
        'name': user.name
    }


def format_noti_object(noti):
    """recieves noti model instance and returns JSON of it"""
    return {
        'enable_noti': noti.enable_noti,
        'enable_segregate': noti.enable_segregate,
        'enable_kakao': noti.enable_kakao,
    }


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

        if user is not None:
            login(request, user)
            noti_setting = NotiSetting.objects.get(user=user)
            response_json = {'user': format_user_object(user), 'noti': format_noti_object(noti_setting)}
            return JsonResponse(response_json, status=200)
        else:
            return HttpResponse(content='user is None', status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def signout(request):
    """REST API description of /api/signout"""
    """GET: Signs out the user. Return 204 response"""
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def signup(request):
    """REST API description of /api/signup"""
    """POST: Recieves and registers info of new user. Return 201 response"""
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
            name = req_data['name']
        except (KeyError, ValueError):
            return HttpResponseBadRequest()

        new_user = User.objects.create_user(email=email, password=password, name=name)
        new_noti = NotiSetting(user=new_user)
        new_noti.save()
        login(request, new_user)
        response_json = {'user': format_user_object(new_user), 'noti': format_noti_object(new_noti)}
        return JsonResponse(response_json, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def password_change(request):
    """Decorative function to change password and maintain login session"""
    form = PasswordChangeForm(user=request.user, data=request.POST)
    if form.is_valid():
        form.save()
        update_session_auth_hash(request, form.user)


# pylint: disable=R0911
@csrf_exempt
def user_info(request):
    """GET: returns information of User in dictionary. Return dict with 200"""
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        else:
            user = User.objects.get(id=request.user.id)
            return JsonResponse(format_user_object(user), status=200)
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        else:
            try:
                req_data = json.loads(request.body.decode())
                password = req_data['password']
                name = req_data['name']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            user = User.objects.get(id=request.user.id)
            if password != '':
                password_change(request)
            if name != '':
                user.name = name
            user.save()
            return JsonResponse(format_user_object(user), status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


@ensure_csrf_cookie
def token(request):
    """CSRF token provider"""
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
