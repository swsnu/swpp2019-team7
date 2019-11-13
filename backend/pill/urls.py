from django.urls import path

from . import views

urlpatterns = [
    path('pill/', views.PillItem, name='getUserPills'),
    path('pill/<int:pill_id>/', views.PillItemsPerUser.as_view()),
]
