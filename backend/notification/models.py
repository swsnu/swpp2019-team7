import math
import re

from django.db import models
import telegram

from pill.models import Pill
from user.models import User

"""
Default hour constant for notification.
For more than 3 times a day,
we will uniformly divide interval START_TIME~END_TIME with the given time per day.
"""
DATETIME = [[900], [900, 1900], [900, 1300, 1900]]
START_TIME = 900
END_TIME = 2100

"""
Telegram Chatbot Instance
"""
AUTH_KEY = '1007785006:AAGZNrBr4w-Eovrf-ZQj7P7MSN6KS3Cl23g'
TELEGRAM_BOT = telegram.Bot(AUTH_KEY)


class Notification(models.Model):
    """
    Single Notification defines each user's each pill's set of notifications
    """
    activated = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pill = models.ForeignKey(Pill, on_delete=models.CASCADE)

    def __str__(self):
        return f"Notification [{self.id}| {self.activated}| {self.user} / {self.pill}]"

    @classmethod
    def create(cls, user, pill, activated=True, time_list=None):
        """
        All Notification Creation should be done through this method
        :param user: User object to associate this notification onto
        :param pill: Pill object to associate this notification onto
        :param activated: whether this notification is activated
        :param time_list: list of 3 or 4 digit integer representing time e.g. [900, 1300, 1900]
        :return: WebNotification Instance
        """
        #If pill is custom pill, It won't have formatted take method. Create only notification, without time
        if pill.custom is True:
            notification = cls(activated=activated, user=user, pill=pill)
            notification.save()
            return notification

        datetime_list = time_list

        # If time not given, set to default pill take-time
        if time_list is None:
            day, time = tuple(re.findall(r'\d+', pill.take_method_preprocessed))
            time_per_day = math.ceil(int(time) / int(day))
            if time_per_day > 3:
                datetime_list = [END_TIME + i for i in range(int((END_TIME - START_TIME) / time_per_day))]
            else:
                datetime_list = DATETIME[time_per_day - 1]
        datetime_list = list(map(str, datetime_list))

        notification = cls(activated=activated, user=user, pill=pill)
        notification.save()
        for datetime in datetime_list:
            datetime = datetime[:-2] + ":" + datetime[-2:]
            NotificationTime.objects.create(notification=notification, time=datetime).save()

        return notification


class NotificationTime(models.Model):
    """
    Defines each notification elements, comprising WebNotification Instance
    """
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name='notitime')
    time = models.TimeField(blank="09:00")

    def __str__(self):
        return f"{self.notification} | {self.time}"

    def get_4_digit_time(self):
        """Returns the standard 4 letter string of time"""
        time_string = f"{self.time}"
        datetime_string = time_string[0:2] + time_string[3:5]
        return datetime_string


class NotificationInterval(models.Model):
    """
    Defines notification interval that belongs to each User
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    send_time = models.TimeField(blank="09:00")  # time to send the notification
    start_time = models.TimeField(blank="09:00")  # start time of the interval
    end_time = models.TimeField(blank="12:00")  # ending time of the interval

    """
        @classmethod
        def create(cls, user, start_time, end_time):
            notiinterval = cls(user=user, send_time=start_time, start_time=start_time, end_time=end_time)
            notiinterval.save()
            print(notiinterval)
            return notiinterval
    """

    @classmethod
    def initialize_user_interval(cls, user):
        """
        Initializes notification intervals for the given user
        """
        assert not cls.objects.exists(user=user), "User already have interval setting information."

        # initial interval setting for user
        interval_list = [["09:00", "12:00"], ["12:00", "18:00"], ["18:00", "21:00"]]

        for interval in interval_list:
            NotificationInterval.objects.create(user=user, start_time=interval[0], end_time=[interval[1]])

    def get_notification_in_interval(self):
        """
        Returns all notifications in this interval for this user
        """
        notification_set = set()

        for notification in Notification.objects.filter(user=self.user):
            notification_set.union(
                set(map(lambda x: x.notification,
                        NotificationTime.objects.filter(
                            notification=notification, time__in=(self.start_time, self.end_time)
                            )
                        )
                    )
                )

        return notification_set

    def __str__(self):
        return f"{self.start_time} | {self.end_time}"


class TelegramUser(models.Model):
    """
    Defines each Telegram User. Can be registered by setting user name in PillBox Account Setting Page
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    telegram_username = models.TextField(max_length=128, default="")
    telegram_first_name = models.TextField(max_length=128, default="")
    telegram_last_name = models.TextField(max_length=128, default="")

    auth_key = models.TextField(max_length=128, default="")
    is_authenticated = models.BooleanField(default=False)  # activated only after user sends any message to our bot.
    chat_id = models.IntegerField(default=-1)  # updated only after user sends any message to our bot.

    def __str__(self):
        return self.telegram_username
