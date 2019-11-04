from django.urls import path

from . import views

urlpatterns = [
    path('vision/', views.image, name='vision'),
]

#TODO_ERASE
#from django.urls import path, include
