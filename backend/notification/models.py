from django.db import models
import re, math

from user.models import User
from pill.models import Pill

"""
Default hour constant for notification.
For more than 3 times a day, 
we will uniformly divide interval START_TIME~END_TIME with the given time per day
"""
DATETIME = [["09:00"], ["09:00", "19:00"], ["09:00", "13:00", "19:00"]]
START_TIME = 900
END_TIME = 2100


class WebNotification(models.Model):
    activated = models.BooleanField(default=True)
    notification_time = models.DateTimeField()  # TODO change this to datetime string list
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    pill = models.ForeignKey(
        Pill,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Notification for {self.user} / {self.pill}"

    @classmethod
    def create(cls, user, pill, activated=False, time=None):

        # If time not given, set to default pill take-time
        if time is None:
            day, time = tuple(re.findall(r'\d+', pill.take_method_preprocessed))
            time_per_day = math.ceil(day / float(time))



        # TODO change time to datetime string format
        noti = cls(activated=activated, notification_time=time, user=user, pill=pill)


