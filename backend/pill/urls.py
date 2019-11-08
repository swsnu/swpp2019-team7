from django.urls import path

from . import views

urlpatterns = [
    # path('pill/', views.user_pills, name='user_pills'),
    path('pill/<int:pill_id>/', views.PillItemsPerUser.as_view()),
    # path('pill/<int:pk>/', views.pill, name='vision'),
]
