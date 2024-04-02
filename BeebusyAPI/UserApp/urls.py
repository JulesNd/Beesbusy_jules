from django.urls import path
from UserApp import views
from .views import filter_users
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.pagination import PageNumberPagination

urlpatterns = [
    path('user', views.userApi),  # tous les utilisateurs et ajouter un user
    path('user/<int:id>', views.userApi), 
    path('user/filter/', filter_users, name='filter_users'), 
] 
