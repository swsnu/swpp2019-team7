from django.db import models

# Create your models here.
""" class Pill(models.Model):
    take_method = models.TextField()
    product_name = models.TextField()
    expiration_date = models.TextField()
    functions = models.TextField()
    store_method = models.TextField()
    company_name = models.TextField()
    standards = models.TextField()
    precautions = models.TextField() """

class Hero(models.Model):
    name = models.CharField(max_length=120)

