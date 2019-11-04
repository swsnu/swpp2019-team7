from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

from user.models import User
from pill.models import Pill

class Image(models.Model):
    """Model implementation of Image Model"""
    filename = models.TextField(max_length=128)
    content = models.ImageField(upload_to="image/", default="image/default_pill_image.png")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
    )
    pill = models.ForeignKey(
        Pill,
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return self.filename
