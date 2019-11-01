from django.db import models

from user.models import User
from pill.models import Pill

class Image(models.Model):
    """Model implementation of Image Model"""
    filename = models.TextField(max_length=128)
    content = models.ImageField(upload_to="image/")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    pill = models.ForeignKey(
        Pill,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.filename
        



#TODO_ERASE
#from django.contrib.auth.models import PermissionsMixin
#from django.contrib.auth.base_user import AbstractBaseUser
#from django.utils.translation import ugettext_lazy as _