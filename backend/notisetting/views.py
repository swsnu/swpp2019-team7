import json

from django.http import HttpResponse, HttpResponseNotAllowed, \
    JsonResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.forms import PasswordChangeForm
from .models import User, NotiSetting
# Create your views here.

def formatNotiObject(noti):
    return {
        'enable_noti': noti.enable_noti,
        'enable_segregate': noti.enable_segregate,
        'enable_kakao': noti.enable_kakao,
    }
@csrf_exempt
def notiSetting(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        elif not User.objects.filter(id=request.user.id).exists():
            return HttpResponseNotFound()
        else:
            noti = User.objects.get(id=request.user.id).notiSetting
            return JsonResponse(formatNotiObject(noti), status=200)
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        elif not User.objects.filter(id=request.user.id).exists():
            return HttpResponseNotFound()
        else:
            try:
                req_data = json.loads(request.body.decode())
                print(req_data)
                enable_noti = req_data['enable_noti']
                enable_segregate = req_data['enable_segregate']
                enable_kakao = req_data['enable_kakao']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            
            noti = User.objects.get(id=request.user.id).notiSetting
            noti.enable_noti = enable_noti
            noti.enable_segregate = enable_segregate
            noti.enable_kakao = enable_kakao
            noti.save()
            
            return JsonResponse(formatNotiObject(noti), status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])
    