from django.urls import path

from . import views

urlpatterns = [
    path('user/signin/', views.signin, name='login'),
    path('user/signout/', views.signout, name='login'),
    path('user/signup/', views.signup, name='signup'),
    path('user/', views.user_info, name='userInfo'),
    path('token/', views.token, name='token'),
]
