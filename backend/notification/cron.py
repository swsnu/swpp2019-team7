"""Define the cron job for sending notification"""
import datetime

from django.utils import timezone

from fcm_django.models import FCMDevice
from notification.models import *


def send_notification():
    # TODO: Read in the notification model(not implemented yet), parse the time.
    # This cron job will be performed every minute. If the parsed time matches current time,
    # send the notification as below.
    # You should use 'filter' and search the device using the device token!
    # device = FCMDevice.objects.all().first()    # This should be a for loop, looping through all devices
    # device.send_message(title="Have your pills", body="NOW!", icon="/Pillbox.png")
    # print(f'Message Sent for {device.user}')

    now = timezone.localtime(timezone.now())
    now = datetime.time(now.hour, now.minute)
    print(f'Current Time: {now}')
    for device in FCMDevice.objects.all():
        user = device.user
        notification_list = list(WebNotification.objects.filter(user=user))  # list of datetime.time(hour, minute)
        for notification in notification_list:
            if NotificationTime.objects.filter(notification=notification, time=now).exists():
                device.send_message(title="Pillbox Notification",
                                    body=f'Time to take {notification.pill}',
                                    icon="/Pillbox.png")

    # TODO currently does not support interval messaging.
