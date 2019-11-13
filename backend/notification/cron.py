"""Define the cron job for sending notification"""
import datetime

from django.utils import timezone

from fcm_django.models import FCMDevice
from notification.models import *


def send_notification():
    # This cron job will be performed every minute. If the parsed time matches current time,
    # send the notification as below.
    # You should use 'filter' and search the device using the device token!
    # device = FCMDevice.objects.all().first()    # This should be a for loop, looping through all devices
    # device.send_message(title="Have your pills", body="NOW!", icon="/Pillbox.png")
    # print(f'Message Sent for {device.user}')

    now = timezone.localtime(timezone.now())
    now = datetime.time(now.hour, now.minute)
    print(f'Current Time: {now}')

    # TODO currently we do not check whether each user/pill's notification is activated.

    # Send message to all device registered in DB
    for device in FCMDevice.objects.all():
        user = device.user
        notification_list = list(Notification.objects.filter(user=user))  # list of datetime.time(hour, minute)
        for notification in notification_list:
            if NotificationTime.objects.filter(notification=notification, time=now).exists():
                device.send_message(title="Pillbox Notification",
                                    body=f'Time to take {notification.pill}',
                                    icon="/Pillbox.png")

    # Send telegram message to all telegram users registered in DB
    for telegram_user in TelegramUser.objects.all():
        user = telegram_user.user
        notification_list = list(Notification.objects.filter(user=user))  # list of datetime.time(hour, minute)
        for notification in notification_list:
            if NotificationTime.objects.filter(notification=notification, time=now).exists():
                telegram_bot.send_message(chat_id=telegram_user.chat_id, text=f"Time to take {notification.pill}")

    # TODO currently does not support interval messaging.
