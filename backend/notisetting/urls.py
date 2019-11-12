from django.urls import  path

from . import views

urlpatterns = [
    path('user/noti-setting/', views.notisetting, name='notisetting'),
]
