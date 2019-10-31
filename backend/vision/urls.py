from django.urls import path, include

from . import views

urlpatterns = [
    path('vision/', views.image, name='vision'),
    # path(r'vision/', include('django_drf_filepond.urls'))
]
