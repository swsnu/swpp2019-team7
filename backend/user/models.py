from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from .managers import UserManager

from pill.models import Pill

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(_('password'), max_length=100, blank=True)
    name = models.CharField(_('name'), max_length=100, blank=True)
    register_date = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login_date = models.DateTimeField(
        _('last logged-in'), auto_now_add=True)
    # pills = models.ManyToManyField(
    #     Pill,
    #     related_name='pills'
    # )

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self):
        return "api/user/%i/" % (self.pk)
