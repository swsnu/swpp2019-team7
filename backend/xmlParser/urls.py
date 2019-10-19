#I made this file
from django.urls import path
from . import views

urlpatterns = [
    path('', views.pill_list, name='pill_list'),
]