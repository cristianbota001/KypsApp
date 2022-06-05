from django.urls import path
from .views import GetCredentials, Registration

urlpatterns = [
    path("registration", Registration),
    path("get_credentials/<str:user_auth_id>", GetCredentials)
]
