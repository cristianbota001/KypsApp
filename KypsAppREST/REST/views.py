from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from requests import request
from .serializer import CredentialsSerializer
from .models import Profile

def CheckAuthID(user_auth_id):
    user_auth_id = Profile.objects.filter(user_auth_id = user_auth_id)
    if not user_auth_id.exists():
        return HttpResponse(status = 404)

def GetCredentials(request, user_auth_id):
    if request.method == "GET":
        CheckAuthID()
        credentials = CredentialsSerializer(Profile.objects.filter(user_auth_id = user_auth_id).first())
        return JsonResponse(credentials.data, safe=False)
