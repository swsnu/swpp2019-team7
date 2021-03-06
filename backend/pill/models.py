from django.db import models
from user.models import User
#from backend.user import models as user_models


class Pill(models.Model):
    """Model description for Pill Model"""
    take_method = models.TextField(null=True, default='')
    product_name = models.TextField(null=True, default='')
    expiration_date = models.TextField(null=True, default='')
    functions = models.TextField(null=True, default='')
    store_method = models.TextField(null=True, default='')
    company_name = models.TextField(null=True, default='')
    standards = models.TextField(null=True, default='')
    precautions = models.TextField(null=True, default='')
    take_method_preprocessed = models.TextField(null=True, default='')
    custom = models.BooleanField(default=False)
    users = models.ManyToManyField(User, related_name='pills')

    def __str__(self):
        return self.product_name


class CustomPill(Pill):
    """Model description for Pill Model"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='custom_pills')
"""
from user.models import User
class NonInherit(models.Model):
    #Model description for Pill Model
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inherit')
    take_method = models.TextField(null=True, default='')
    product_name = models.TextField(null=True, default='')
    expiration_date = models.TextField(null=True, default='')
    functions = models.TextField(null=True, default='')
    store_method = models.TextField(null=True, default='')
    company_name = models.TextField(null=True, default='')
    standards = models.TextField(null=True, default='')
    precautions = models.TextField(null=True, default='')
    take_method_preprocessed = models.TextField(null=True, default='')
    def __str__(self):
        return self.product_name
"""
