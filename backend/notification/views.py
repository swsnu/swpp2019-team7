"""Backend for registering the device using FCM token!"""
from fcm_django.models import FCMDevice
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from rest_framework import status

import json


@csrf_exempt
def register_device(request):
    """POST: Makes a FCM model """
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                req_data = json.loads(request.body.decode())
                FCMToken = req_data['fcmtoken']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            device = FCMDevice()
            # registration_id is a mandatory field and should be the FCM token!
            device.registration_id = FCMToken
            # Fields below are not mandatory anymore
            device.name = "Testing device"
            device.user = request.user
            device.type = "web"
            device.save()
            return HttpResponse(status=status.HTTP_201_CREATED)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return HttpResponseNotAllowed(['POST'])
