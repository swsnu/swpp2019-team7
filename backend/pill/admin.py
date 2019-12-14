from django.contrib import admin
from .models import Pill, CustomPill


# Register your models here.s
admin.site.register(Pill)
admin.site.register(CustomPill)