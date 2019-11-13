"""Backend for registering the device using FCM token!"""
from fcm_django.models import FCMDevice
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from rest_framework import status
import json

from .models import *


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


@csrf_exempt
def telegram(request):
    """
    Endpoint for Telegram Bot Webhook. i.e. all requests about messages to our telegram bot are handled here.
    """
    if request.method == 'POST':
        # All Telegram Webhooks come as POST request
        data = json.loads(request.body.decode())
        print(data)
        username = data['message']['chat']['username']
        first_name = data['message']['chat']['first_name']
        last_name = data['message']['chat']['last_name']
        chat_id = data['message']['chat']['id']

        text = data['message']['text']
        return HttpResponse(status=status.HTTP_200_OK)

    return HttpResponseNotAllowed(['POST'])


def register_telegram(request):
    """
    Registers sender PillBox username with the given telegram name.
    If user already have registered telegram name, it is updated to new telegram name.
    Frontend has to store the auth key sent from here as response, and show it to user s.t. user types it in Telegram
    """
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                data = json.loads(request.body.decode())
                telegram_name = data['telegram_name']
                telegram_first_name = data['telegram_first_name']
                telegram_last_name = data['telegram_last_name']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()

            TelegramUser.objects.filter(user=request.user).delete()
            new_telegram_user = TelegramUser.objects.create(
                user=request.user,
                telegram_name=telegram_name,
                telegram_first_name=telegram_first_name,
                telegram_last_name=telegram_last_name,
                auth_key="필박스 조아"  # TODO implement key generating function and call it here
            )
            new_telegram_user.save()

            return JsonResponse({"auth_key": "필박스 조아"}, status.HTTP_200_OK)  # TODO change auth key
        else:
            return HttpResponse(status.HTTP_401_UNAUTHORIZED)

    else:
        return HttpResponse(status.HTTP_405_METHOD_NOT_ALLOWED)
