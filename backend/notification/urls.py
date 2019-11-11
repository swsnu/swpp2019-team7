from django.urls import path

from . import views

urlpatterns = [
    path('registerdevice/', views.crud_device, name='registerDevice'),
]