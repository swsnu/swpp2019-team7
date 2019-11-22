from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

from user.models import User


class NotiSetting(models.Model):
    """Model description for NotiSetting, a one-to-one with User"""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='notiSetting',
    )
    enable_noti = models.BooleanField(default=True)
    enable_segregate = models.BooleanField(default=False)
    enable_kakao = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email + " / " + self.user.name
