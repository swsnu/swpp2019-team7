from django.urls import path

from . import views

urlpatterns = [
    path('vision/', views.image, name='vision'),
    # path(r'vision/', include('django_drf_filepond.urls'))
]

#TODO_ERASE
#from django.urls import path, include
