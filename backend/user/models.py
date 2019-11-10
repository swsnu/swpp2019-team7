from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from annoying.fields import AutoOneToOneField

from pill.models import Pill

from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    """Model description for USER model"""
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(_('password'), max_length=100, blank=True)
    name = models.CharField(_('name'), max_length=100, blank=True)
    register_date = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login_date = models.DateTimeField(
        _('last logged-in'), auto_now_add=True)
    pills = models.ManyToManyField(Pill, related_name='pills')      # many-to-many between User and Pill

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self):
        """Shows the REST API url of the specific user"""
        return "api/user/%i/" % (self.pk)

class NotiSetting(models.Model):
    """Model description for NotiSetting, a one-to-one with User"""
    user = models.OneToOneField(
       User,
       on_delete=models.CASCADE,
       primary_key=True,
       related_name='notiSetting',
    )
    enable_notifications = models.BooleanField(default=True)
    enable_segregate = models.BooleanField(default=False)
    enable_kakao = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email + " / " + self.user.name