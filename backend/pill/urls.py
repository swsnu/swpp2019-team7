from django.urls import path

from . import views

urlpatterns = [
    path('pill/', views.get_user_pills, name='getUserPills'),
    path('pill/<int:pill_id>/', views.PillItemsPerUser.as_view()),
    path('pill/<int:pill_id>/image', views.post_pill_photo),
    path('pill/allpills/', views.get_pill_list),
    path('pill/name/', views.register_pill_by_name),
    path('custompill/', views.custompill_post, name='customUserPills'),
]
