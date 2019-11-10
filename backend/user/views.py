import json

from django.http import HttpResponse, HttpResponseNotAllowed, \
    JsonResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.forms import PasswordChangeForm
from .models import User, NotiSetting
# Create your views here.

def formatUserObject(user):
    return {
        'id': user.id, 
        'email': user.email, 
        'password': user.password, 
        'name': user.name, 
        'register-date': user.register_date, 
        'last-login-date': user.last_login_date
    }
def formatNotiObject(noti):
    return {
        'enable_noti': noti.enable_noti,
        'enable_coalesce': noti.enable_coalesce,
        'enable_kakao': noti.enable_kakao,
    }
@csrf_exempt
def signin(request):
    """REST API description of /api/signin"""
    """POST: recieve user authentication and see if registered. Return 204 response"""
    if request.method == 'POST':
        try:
            print('LOGIN requst.header: ', request.get_full_path_info())
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, ValueError):
            return HttpResponseBadRequest()
        user = authenticate(request, email=email, password=password)
        # print('Does it work?')
        if user is not None:
            login(request, user)
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
        print('LOGOUT requst.header: ', request.get_full_path_info())
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
        print("User is {} {} {}".format(email, password, name))
        new_user = User.objects.create_user(email=email, password=password, name=name)
        new_notisetting = NotiSetting()
        new_notisetting.save()
        return HttpResponse(formatUserObject(new_user), status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def password_change(request):
    """Decorative function to change password and maintain login session"""
    form = PasswordChangeForm(user = request.user, data = request.POST)
    if form.is_valid():
        print('valid form')
        form.save()
        update_session_auth_hash(request, form.user)

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
            return JsonResponse(formatUserObject(user), status=200)
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        elif not User.objects.filter(id=user_id).exists():
            return HttpResponseNotFound()
        else:
            try:
                req_data = json.loads(request.body.decode())
                password = req_data['password']
                name = req_data['name']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            user = User.objects.get(id=user_id)
            if password != '':
                password_change(request)
            if name != '':
                user.name = name
            user.save()
            return JsonResponse(formatUserObject(user), status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


@csrf_exempt
def notiSetting(request, user_id):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        elif not User.objects.filter(id=user_id).exists():
            return HttpResponseNotFound()
        else:
            noti = User.objects.get(id=user_id).notisetting
            return JsonResponse(formatNotiObject(noti), status=200)
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        elif not User.objects.filter(id=user_id).exists():
            return HttpResponseNotFound()
        else:
            try:
                req_data = json.loads(request.body.decode())
                enable_noti = req_data['enable_noti']
                enable_coalesce = req_data['enable_coalesce']
                enable_kakao = req_data['enable_kakao']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            
            noti = User.objects.get(id=user_id).notisetting
            noti.enable_noti = enable_noti
            noti.enable_coalesce = enable_coalesce
            noti.enable_kakao = enable_kakao
            noti.save()
            
            return JsonResponse(formatNotiObject(noti), status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])
    

@ensure_csrf_cookie
def token(request):
    """CSRF token provider"""
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
