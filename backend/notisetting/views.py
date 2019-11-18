import json

from django.http import HttpResponse, HttpResponseNotAllowed, \
    JsonResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from user.models import User
# Create your views here.


def format_noti_object(noti):
    """takes model instance noti and returns json"""
    return {
        'enable_noti': noti.enable_noti,
        'enable_segregate': noti.enable_segregate,
        'enable_kakao': noti.enable_kakao,
    }


# pylint: disable=R0911
@csrf_exempt
def notisetting(request):
    """Defines the view of notiSetting model"""
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        else:
            noti = User.objects.get(id=request.user.id).notiSetting
            return JsonResponse(format_noti_object(noti), status=200)
    elif request.method == 'PUT':

        # TODO (updated by JAEHUN): when 'enable interval' is updated, if user does not
        # have any notification interval yet, initialize the interval for users.
        # I will make the initialization method for this in NotificationInterval Class
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        else:
            try:
                req_data = json.loads(request.body.decode())
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
            return JsonResponse(format_noti_object(noti), status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])
