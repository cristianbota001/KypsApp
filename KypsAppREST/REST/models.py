import imp
from django.db import models
from django.contrib.auth.models import User

class Credentials(models.Model):
    service = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user + self.service


