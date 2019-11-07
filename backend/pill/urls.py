from django.urls import path

from . import views

urlpatterns = [
    path('pill/', views.PillItemsPerUser.as_view()),
    path('pill/<int:pill_id>/', views.PillItemsPerUser.as_view(), name='pill_id'),
    # path('pill/<int:pk>/', views.pill, name='vision'),
]
