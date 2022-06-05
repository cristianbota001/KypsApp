from email.mime import base
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from requests import request
from .serializer import CredentialsSerializer
from .models import Profile
from django.views.decorators.csrf import csrf_exempt
from .forms import RegistrationForm
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
import base64
import os

@csrf_exempt
def Registration(request):
    context = {}
    context["form"] = RegistrationForm(request.POST or None)
    if request.method == "POST":
        if context["form"].is_valid():
            username = context["form"].cleaned_data["username"]
            password = context["form"].cleaned_data["password1"]
            user_auth_id = GetNewID()
            user = User.objects.create_user(username = username, password = password)
            Profile.objects.create(user = user, user_auth_id = user_auth_id)
            return JsonResponse({"response":"ok"})
        else:
            context["errors"] = context["form"].errors
            return JsonResponse({"response":{"errors":context["errors"]}})
    return HttpResponse(status=403)

def GetNewID():
    ris = Profile.objects.all()
    id_list = [x["user_auth_id"] for x in ris]
    while True:
        new_id = base64.urlsafe_b64encode(os.urandom(50)).decode()
        if new_id not in id_list:
            return new_id

def CheckAuthID(user_auth_id):
    user_auth_id = Profile.objects.filter(user_auth_id = user_auth_id)
    if not user_auth_id.exists():
        return HttpResponse(status = 404)

def GetCredentials(request, user_auth_id):
    if request.method == "GET":
        CheckAuthID(user_auth_id)
        credentials = CredentialsSerializer(Profile.objects.filter(user_auth_id = user_auth_id).first())
        return JsonResponse(credentials.data, safe=False)
    return HttpResponse(status=403)

@csrf_exempt
def PostCredentials(request):
    if request.method == "POST":
        CheckAuthID(request.POST["user_auth_id"])
        profile = Profile.objects.filter(user_auth_id = request.POST["user_auth_id"]).first()
        data = request.POST.copy()
        data["profile"] = profile
        credentials = CredentialsSerializer(data=data)
        if credentials.is_valid():
            return JsonResponse(credentials.data, safe=False)
    return HttpResponse(status=403)