from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Notification)
admin.site.register(NotificationTime)
admin.site.register(NotificationInterval)
admin.site.register(TelegramUser)