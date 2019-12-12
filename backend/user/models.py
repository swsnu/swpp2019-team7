from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

#from pill.models import Pill

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """Model description for USER model"""
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(_('password'), max_length=100, blank=True)
    name = models.CharField(_('name'), max_length=100, blank=True)
    register_date = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login_date = models.DateTimeField(
        _('last logged-in'), auto_now_add=True)
    # many-to-many between User and Pill
    #pills = models.ManyToManyField(Pill, related_name='users')

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
