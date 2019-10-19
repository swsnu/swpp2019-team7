from django.db import models

# Create your models here.
class Pill(models.Model):
    take_method = models.TextField(null=True, default='')
    product_name = models.TextField(null=True, default='')
    expiration_date = models.TextField(null=True, default='')
    functions = models.TextField(null=True, default='')
    store_method = models.TextField(null=True, default='')
    company_name = models.TextField(null=True, default='')
    standards = models.TextField(null=True, default='')
    precautions = models.TextField(null=True, default='')

#class Hero(models.Model):
#    name = models.CharField(max_length=120)