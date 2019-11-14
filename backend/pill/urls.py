from django.urls import path

from . import views

urlpatterns = [
    path('pill/', views.get_uer_pills, name='getUserPills'),
    path('pill/<int:pill_id>/', views.PillItemsPerUser.as_view()),
]
