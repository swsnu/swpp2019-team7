from django.urls import path

from . import views

urlpatterns = [
    path('registerdevice/', views.crud_device, name='crud_device'),
    path('telegram/', views.telegram, name='telegram'),
    path('register-telegram/', views.register_telegram, name='register_telegram'),
    path('webnoti/<int:req_id>/', views.webnoti_pill, name='webnoti'),
    path('webnoti/', views.webnoti, name='webnoti'),
    path('notification-interval/', views.notification_interval, name='notification_interval'),
    path('notification-in-interval/<int:req_id>/', views.notification_in_interval, name='notification_in_interval'),
]
