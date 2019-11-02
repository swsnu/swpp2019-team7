from django.db import models


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

    def __str__(self):
        return self.product_name