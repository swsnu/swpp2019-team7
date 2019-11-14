import math
import re

from django.db import models

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


class WebNotification(models.Model):
    """
    Single WebNotification defines each user's each pill's set of notifications
    """
    activated = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pill = models.ForeignKey(Pill, on_delete=models.CASCADE)

    def __str__(self):
        return "Notification [{self.user} / {self.pill}]"

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
        datetime_list = time_list

        # If time not given, set to default pill take-time
        if time_list is None:
            day, time = tuple(re.findall(r'\d+', pill.take_method_preprocessed))
            time_per_day = math.ceil(int(time) / int(day))
            if time_per_day > 3:
                datetime_list = [END_TIME + i for i in range(int((END_TIME - START_TIME) / time_per_day))]
            else:
                datetime_list = DATETIME[time_per_day - 1]
        datetime_list = list(map(lambda x: str(x), datetime_list))

        notification = cls(activated=activated, user=user, pill=pill)
        notification.save()
        for datetime in datetime_list:
            datetime = datetime[:-2] + ":" + datetime[-2:]
            print(datetime)
            NotificationTime.objects.create(notification=notification, time=datetime).save()

        return notification


class NotificationTime(models.Model):
    """
    Defines each notification elements, comprising WebNotification Instance
    """
    notification = models.ForeignKey(WebNotification, on_delete=models.CASCADE, related_name='notification_time')
    time = models.TimeField(blank="09:00")

    def __str__(self):
        return "{self.notification} | {self.time}"

