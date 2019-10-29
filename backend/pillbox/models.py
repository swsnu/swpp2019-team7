from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from .managers import UserManager


class Pill(models.Model):
    take_method = models.TextField(null=True, default='')
    product_name = models.TextField(null=True, default='')
    expiration_date = models.TextField(null=True, default='')
    functions = models.TextField(null=True, default='')
    store_method = models.TextField(null=True, default='')
    company_name = models.TextField(null=True, default='')
    standards = models.TextField(null=True, default='')
    precautions = models.TextField(null=True, default='')

    def __str__(self):
        return self.product_name


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(_('password'), max_length=100, blank=True)
    name = models.CharField(_('name'), max_length=100, blank=True)
    register_date = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login_date = models.DateTimeField(
        _('last logged-in'), auto_now_add=True)
    pills = models.ManyToManyField(
        Pill,
        related_name='pills'
    )

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)


class Image(models.Model):
    content = models.ImageField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    # pill = models.ForeignKey(
    #     Pill,
    #     on_delete=models.CASCADE,
    #     related_name='image',
    # )

# Create your models here.
