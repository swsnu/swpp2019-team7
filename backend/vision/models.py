from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from user.models import User


class Image(models.Model):
    filename = models.TextField(max_length=128)
    content = models.ImageField(upload_to="image/")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.filename
    # TODO

# Create your models here.
