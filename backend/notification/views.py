"""Backend for registering the device using FCM token!"""
from fcm_django.models import FCMDevice
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from rest_framework import status

from .models import WebNotification, NotificationTime
from pill.models import Pill

import json

def format_webnoti_list_object(item):
    """ Takes a web notification item and makes it into JSON """
    return {
        'id': item.id,
        'activated': item.notification_time,
        'time': item.time
    }


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

def webnoti (request):
    """Function for getting/returning web notification"""
    if request.method == 'GET':
        if request.user.is_authenticated:
            webnoti_list = WebNotification.objects.filter(user=request.user)
            webnoti_formatted_list = list(map(format_webnoti_list_object, webnoti_list))
            return JsonResponse(webnoti_formatted_list, status=status.HTTP_200_OK)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return HttpResponseNotAllowed(['GET'])

def webnoti_pill(request, req_id):
    """Function for editing specific pill of webnoti"""
    if request.method == 'PUT':
        if request.user.is_authenticated:
            pill = Pill.objects.filter(id=req_id)
            webnoti_item = WebNotification.objects.get(user=request.user, pill=pill)
            try:
                req_data = json.loads(request.body.decode())
                activated = req_data['activated']
                datetime_list = req_data['time']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()
            webnoti_item.activated = activated
            #for time in time, get webnoti, edit, and then return
            notification_time_list = NotificationTime.objects.filter(notification=webnoti_item)
            index = 0
            for datetime in datetime_list:
                datetime = datetime[:-2] + ":" + datetime[-2:]
                print(datetime)
                notification = notification_time_list[index]
                notification.time = datetime
                notification.save()
                index += 1
            #if datetime doesn't exist, delete
            if len(notification_time_list) > index:
                for notification in notification_time_list[index:-1]:
                    notification.delete()
            #if notification_time doesn't exist, add new
            if len(datetime_list) > index:
                for datetime in datetime_list[index:-1]:
                    datetime = datetime[:-2] + ":" + datetime[-2:]
                    print(datetime)
                    NotificationTime.objects.create(notification=webnoti_item, time=datetime).save()
            
            webnoti_item.save()
            webnoti_list = WebNotification.objects.filter(user=request.user)
            webnoti_formatted_list = list(map(format_webnoti_list_object, webnoti_list))
            return JsonResponse(webnoti_formatted_list, status=status.HTTP_200_OK)
        else:
            return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return HttpResponseNotAllowed(['GET'])