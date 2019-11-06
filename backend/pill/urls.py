from django.urls import path

from . import views

urlpatterns = [
    path('pill/<int:pill_id>', views.PillItemsPerUser.as_view(), name='vision'),
    # path('pill/<int:pk>/', views.pill, name='vision'),
]
