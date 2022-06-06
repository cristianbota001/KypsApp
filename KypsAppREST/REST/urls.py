from django.urls import path
from .views import GetCredentials, Registration, Login, PostCredentials, DeleteCredentials

urlpatterns = [
    path("registration", Registration),
    path("login", Login),
    path("post_credentials", PostCredentials),
    path("get_credentials/<str:user_auth_id>", GetCredentials),
    path("delete_credentials/<str:id_cred>/<str:user_auth_id>", DeleteCredentials),
]
