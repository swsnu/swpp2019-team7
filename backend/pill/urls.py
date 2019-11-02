from django.urls import path

from . import views

urlpatterns = [
    path('pill/user/<int:pk>/'),
    path('pill/<int:pk>/')
]
