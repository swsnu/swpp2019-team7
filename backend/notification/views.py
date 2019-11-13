"""Backend for registering the device using FCM token!"""
from fcm_django.models import FCMDevice
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from rest_framework import status
import json
import shortuuid

from .models import *


def _get_telegram_auth_key():
    return shortuuid.ShortUUID().random(length=4)


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
        first_name = data['message']['chat']['first_name']
        last_name = data['message']['chat']['last_name']
        chat_id = data['message']['chat']['id']

        username = None
        if 'username' in data['message']['chat'].keys():
            username = data['message']['chat']['username']
        # TODO add key error handling logic for 'username' -> username 없으면 firstname으로 찾는다던가 ㅇㅇ

        text = data['message']['text']

        try:
            telegram_user = TelegramUser.objects.get(telegram_username=username) if username is not None else \
                TelegramUser.objects.get(telegram_first_name=first_name)
            telegram_bot.send_message(chat_id=chat_id,
                                      text=f"Hi, {telegram_user.telegram_first_name}!")
        except TelegramUser.DoesNotExist:
            telegram_bot.send_message(chat_id=chat_id,
                                      text="Please register your Telegram account in PillBox Account Setting first.")
            return HttpResponse(status=status.HTTP_200_OK)

        if not telegram_user.is_authenticated:
            if telegram_user.auth_key == text:
                # User has typed right auth key in telegram
                telegram_user.is_authenticated = True
                telegram_user.chat_id = chat_id
                telegram_user.save()
                telegram_bot.send_message(chat_id=chat_id,
                                          text="Your Telegram account has been successfully registered!")
                return HttpResponse(status=status.HTTP_200_OK)
            else:
                # User has typed wrong auth key in telegram
                telegram_bot.send_message(chat_id=chat_id,
                                          text="Wrong Auth key. Please check and type in right Auth key.")
        else:
            # TODO should our bot reply when authenticated user says something?
            return HttpResponse(status=status.HTTP_200_OK)



        # TODO retrieve registered telegram user with names, and check if user is not activated, check if
        #  user typed in auth_key as text, and then finally set the chat_id in DB for the user
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
                telegram_name = data['telegram_username']
                telegram_first_name = data['telegram_first_name']
                telegram_last_name = data['telegram_last_name']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()

            TelegramUser.objects.filter(user=request.user).delete()
            auth_key = "필박스 조아 " + _get_telegram_auth_key()
            new_telegram_user = TelegramUser.objects.create(
                user=request.user,
                telegram_username=telegram_name,
                telegram_first_name=telegram_first_name,
                telegram_last_name=telegram_last_name,
                auth_key=auth_key
            )
            new_telegram_user.save()

            return JsonResponse({"auth_key": auth_key}, status.HTTP_200_OK)
        else:
            return HttpResponse(status.HTTP_401_UNAUTHORIZED)

    else:
        return HttpResponse(status.HTTP_405_METHOD_NOT_ALLOWED)
