from django.urls import  path

from . import views

urlpatterns = [
    path('user/notisetting/', views.notisetting, name='notisetting'),
]
