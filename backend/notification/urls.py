from django.urls import path

from . import views

urlpatterns = [
    path('registerdevice/', views.crud_device, name='crud_device'),
    path('webnoti/', views.webnoti, name='webnoti'),
]
