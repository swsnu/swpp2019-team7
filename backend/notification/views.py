"""Backend for registering the device using FCM token!"""
from fcm_django.models import FCMDevice
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from rest_framework import status

import json

@csrf_exempt
def crud_device(request):
    """ CRUD Operation for FCM devices """
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                req_data = json.loads(request.body.decode())
                fcm_token = req_data['fcmtoken']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()

            device = FCMDevice()
            # registration_id is a mandatory field and should be the FCM token!
            device.registration_id = fcm_token
            # Fields below are not mandatory anymore
            device.name = request.user.name
            device.user = request.user
            device.type = "web"  # TODO check if this can always be web (or need something like "mobile")
            device.save()
            return HttpResponse(status=status.HTTP_201_CREATED)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)

    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            try:
                fcm_token = json.loads(request.body.decode())['fcmtoken']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()

            FCMDevice.objects.filter(registration_id=fcm_token).delete()
            return HttpResponse(status=status.HTTP_200_OK)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)

    else:
        return HttpResponseNotAllowed(['POST'])
