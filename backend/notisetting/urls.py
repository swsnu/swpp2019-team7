from django.urls import  path

from . import views

urlpatterns = [
    path('user/notisetting/', views.notiSetting, name='notiSetting'),
]
