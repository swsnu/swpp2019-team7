"""Backend for registering the device using FCM token!"""
import json
import shortuuid

from fcm_django.models import FCMDevice
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from rest_framework import status

from pill.models import Pill
from .models import Notification, NotificationTime, NotificationInterval, TelegramUser, TELEGRAM_BOT


def _get_telegram_auth_key():
    return shortuuid.ShortUUID().random(length=4)


def format_webnoti_list_object(item):
    """ Takes a web notification item and makes it into JSON """
    notitime_list = NotificationTime.objects.filter(notification=item)
    time_list = []
    for noti in notitime_list:
        time_list.append((noti.get_4_digit_time()))
    return {
        'id': item.id,
        'activated': item.activated,
        'time': time_list
    }


# pylint: disable=R0911
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


def webnoti(request):
    """Function for getting/returning web notification"""
    if request.method == 'GET':
        if request.user.is_authenticated:
            webnoti_list = Notification.objects.filter(user=request.user)
            webnoti_formatted_list = list(map(format_webnoti_list_object, webnoti_list))
            return JsonResponse(webnoti_formatted_list, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return HttpResponseNotAllowed(['GET'])


def notification_interval(request):
    """ CRUD operation for notification interval per each user """
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                req_data = json.loads(request.body.decode())
                interval_list = req_data['interval_list']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()

            for interval in interval_list:
                start_time = interval['start_time']  # TODO check the string format for datetime from frontend
                end_time = interval['end_time']
                NotificationInterval.objects.create(user=request.user, start_time=start_time, end_time=end_time)
            return HttpResponse(status=status.HTTP_200_OK)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return HttpResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)


def webnoti_pill(request, req_id):
    """Function for editing specific pill of webnoti"""
    if request.method == 'PUT':
        if request.user.is_authenticated:
            pill = Pill.objects.get(pk=req_id)
            webnoti_item = Notification.objects.get(user=request.user, pill=pill)
            print(webnoti_item)
            try:
                req_data = json.loads(request.body.decode())
                activated = req_data['activated']
                datetime_list = req_data['time']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            webnoti_item.activated = activated

            # for time in time, get webnoti, edit, and then return
            notification_time_list = NotificationTime.objects.filter(notification=webnoti_item)
            index = 0

            if len(notification_time_list) > len(datetime_list):
                # if datetime doesn't exist, delete
                for datetime in datetime_list:
                    datetime = datetime[:-2] + ":" + datetime[-2:]
                    notification_time = notification_time_list[index]
                    notification_time.time = datetime
                    notification_time.save()
                    index += 1
                for notification_time in notification_time_list[index:]:
                    notification_time.delete()
            elif len(notification_time_list) < len(datetime_list):
                # if notification_time doesn't exist, add new
                for notification_time in notification_time_list:
                    datetime = datetime_list[index]
                    datetime = datetime[:-2] + ":" + datetime[-2:]
                    notification_time.time = datetime
                    notification_time.save()
                    index += 1
                for datetime in datetime_list[index:]:
                    datetime = datetime[:-2] + ":" + datetime[-2:]
                    NotificationTime.objects.create(notification=webnoti_item, time=datetime).save()
            else:
                for datetime in datetime_list:
                    datetime = datetime[:-2] + ":" + datetime[-2:]
                    notification_time = notification_time_list[index]
                    notification_time.time = datetime
                    notification_time.save()
                    index += 1
            webnoti_item.save()
            webnoti_list = Notification.objects.filter(user=request.user)
            webnoti_formatted_list = list(webnoti_list.values('id', 'activated'))
            return JsonResponse(webnoti_formatted_list, status=status.HTTP_200_OK, safe=False)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def telegram(request):
    """
    Endpoint for Telegram Bot Webhook. i.e. all requests about messages to our telegram bot are handled here.
    """
    if request.method == 'POST':
        # All Telegram Webhooks come as POST request
        data = json.loads(request.body.decode())

        first_name = data['message']['chat']['first_name']
        chat_id = data['message']['chat']['id']
        text = data['message']['text']
        username = None
        if 'username' in data['message']['chat'].keys():
            username = data['message']['chat']['username']

        try:
            telegram_user = TelegramUser.objects.get(telegram_username=username) if username is not None else \
                TelegramUser.objects.get(telegram_first_name=first_name)
            TELEGRAM_BOT.send_message(chat_id=chat_id,
                                      text=f"Hi, {telegram_user.telegram_first_name}!")
        except TelegramUser.DoesNotExist:
            TELEGRAM_BOT.send_message(chat_id=chat_id,
                                      text="Please register your Telegram account in PillBox Account Setting first.")
            return HttpResponse(status=status.HTTP_200_OK)

        if not telegram_user.is_authenticated:
            if telegram_user.auth_key == text:
                # User has typed right auth key in telegram
                telegram_user.is_authenticated = True
                telegram_user.chat_id = chat_id
                telegram_user.save()
                TELEGRAM_BOT.send_message(chat_id=chat_id,
                                          text="Your Telegram account has been successfully registered!")
                return HttpResponse(status=status.HTTP_200_OK)
            else:
                # User has typed wrong auth key in telegram
                TELEGRAM_BOT.send_message(chat_id=chat_id,
                                          text="Wrong Auth key. Please check and type in right Auth key.")
        else:
            # TODO should our bot reply when authenticated user says something?
            return HttpResponse(status=status.HTTP_200_OK)

        return HttpResponse(status=status.HTTP_200_OK)

    elif request.method == 'GET':
        if request.user.is_authenticated:
            if TelegramUser.objects.filter(user=request.user).exists():
                telegram_user = TelegramUser.objects.get(user=request.user)
                return JsonResponse({
                    "telegram_username": telegram_user.telegram_username,
                    "telegram_first_name": telegram_user.telegram_first_name,
                    "telegram_last_name": telegram_user.telegram_last_name
                }, status.HTTP_200_OK)
            else:
                return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        else:
            return HttpResponse(status.HTTP_401_UNAUTHORIZED)

    return HttpResponse(status.HTTP_405_METHOD_NOT_ALLOWED)


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

            return JsonResponse({"auth_key": auth_key}, status=status.HTTP_200_OK)
        else:
            return HttpResponse(status.HTTP_401_UNAUTHORIZED)

    else:
        return HttpResponse(status.HTTP_405_METHOD_NOT_ALLOWED)
