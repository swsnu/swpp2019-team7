from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _





class Image(models.Model):
    content = models.ImageField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    # TODO

# Create your models here.
