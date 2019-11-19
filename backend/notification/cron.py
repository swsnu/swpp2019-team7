"""Define the cron job for sending notification"""
import datetime

from django.utils import timezone

from fcm_django.models import FCMDevice
from notisetting.models import NotiSetting
from notification.models import Notification, NotificationTime, NotificationInterval, TelegramUser, TELEGRAM_BOT


def send_notification():
    """
    This cron job will be performed every minute. If the parsed time matches current time,
    send the notification as below.
    """

    now = timezone.localtime(timezone.now())
    now = datetime.time(now.hour, now.minute)
    print(f'Current Time: {now}')

    # Send message to all device registered in DB
    for device in FCMDevice.objects.all():
        user = device.user
        notification_setting = NotiSetting.objects.get(user=user)

        if notification_setting.enable_noti:
            if notification_setting.enable_segregate:
                # if normal, the interval_list should have only a single element
                notification_interval_list = list(NotificationInterval.objects.filter(user=user, send_time=now))
                for notification_interval in notification_interval_list:
                    notification_list = list(notification_interval.get_notification_in_interval())
                    product_name_str = ", ".join(map(lambda x: x.pill.product_name, notification_list))
                    device.send_message(title="Pillbox Notification",
                                        body=f'Time to take {product_name_str}!',
                                        icon="./Pillbox.png")
            else:
                notification_list = list(Notification.objects.filter(user=user))  # list of datetime.time(hour, minute)
                for notification in notification_list:
                    if NotificationTime.objects.filter(notification=notification, time=now).exists():
                        device.send_message(title="Pillbox Notification",
                                            body=f'Time to take {notification.pill}!',
                                            icon="/Pillbox.png")

    # Send telegram message to all telegram users registered in DB
    for telegram_user in TelegramUser.objects.all():
        user = telegram_user.user
        notification_setting = NotiSetting.objects.get(user=user)

        if notification_setting.enable_kakao:
            if notification_setting.enable_segregate:
                # if normal, the interval_list should have only a single element
                notification_interval_list = list(NotificationInterval.objects.filter(user=user, send_time=now))
                for notification_interval in notification_interval_list:
                    notification_list = list(notification_interval.get_notification_in_interval())
                    product_name_str = ", ".join(map(lambda x: x.pill.product_name, notification_list))
                    TELEGRAM_BOT.send_message(
                        chat_id=telegram_user.chat_id,
                        text=f"Time to take {product_name_str}!")
            else:
                notification_list = list(Notification.objects.filter(user=user))  # list of datetime.time(hour, minute)
                for notification in notification_list:
                    if NotificationTime.objects.filter(notification=notification, time=now).exists():
                        TELEGRAM_BOT.send_message(
                            chat_id=telegram_user.chat_id,
                            text=f"Time to take {notification.pill}")
