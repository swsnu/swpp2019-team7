from django.urls import path

urlpatterns = [
    path('pill/user/<int:pk>/'),
    path('pill/<int:pk>/')
]
