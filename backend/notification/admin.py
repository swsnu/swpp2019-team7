from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(WebNotification)
admin.site.register(NotificationTime)
admin.site.register(TelegramUser)