#I made this file
from django.urls import path
from . import views

urlpatterns = [
    path('', views.hero_list, name='hero_list'),
]