from django.urls import path
from .views import GetCredentials, Registration, Login

urlpatterns = [
    path("registration", Registration),
    path("login", Login),
    path("get_credentials/<str:user_auth_id>", GetCredentials),
]
