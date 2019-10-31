from django.db import models
from django.contrib.auth.models import User


class Image(models.Model):
    content = models.ImageField()
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
    )
    # pill = models.ForeignKey(
    #     Pill,
    #     on_delete=models.CASCADE,
    #     related_name='vision',
    # )

# Create your models here.
