from django.urls import path
from .views import GetCredentials

urlpatterns = [
    path("get_credentials/<str:user_auth_id>", GetCredentials)
]
