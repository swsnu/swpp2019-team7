from django.urls import path, include

from . import views

urlpatterns = [
    path('vision/', views.image, name='image'),
    path(r'image/', include('django_drf_filepond.urls'))
]
