from django.urls import path

from . import views

urlpatterns = [
    path('registerdevice/', views.register_device, name='registerDevice'),
]