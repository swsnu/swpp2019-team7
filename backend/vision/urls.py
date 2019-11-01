from django.urls import path

from . import views

urlpatterns = [
    path('vision/', views.image, name='vision'),
]
