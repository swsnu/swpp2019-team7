from django.urls import path

from . import views

urlpatterns = [
    path('registerdevice/<str:FCMToken>', views.register_device, name='registerDevice'),
]