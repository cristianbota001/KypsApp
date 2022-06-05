from django import forms
import re
from django.contrib.auth.models import User

class RegistrationForm(forms.Form):

    username = forms.CharField(required=False)
    password1 = forms.CharField(required=False)
    password2 = forms.CharField(required=False)

    def clean(self):
        
        cred = super().clean()

        if cred.get("username"):
            if re.findall("[ -/-:-@-[-^-{-⁓]",cred.get("username")):
                self.add_error("username", "L'username può solo contenere lettere e numeri")
        
        user_db = User.objects.filter(username = cred.get("username"))
        
        if user_db.exists():
            self.add_error("username", "Nome utente già esistente")

        if cred.get("password1"):
            if re.findall("[ -/-:-@-[-^-{-⁓]", cred.get("password1")):
                self.add_error("password1","La password può solo contenere lettere e numeri")
        elif cred.get("method") == "submit":
            self.add_error("password1", "Compilare il campo")  
        
        if cred.get("password2"):
            if re.findall("[ -/-:-@-[-^-{-⁓]",cred.get("password2")):
                self.add_error("password2","La password può solo contenere lettere e numeri")
            
            elif not cred.get("password1") == cred.get("password2") and cred.get("password1"):
                self.add_error("password2","Password non inserita correttamente")
        elif cred.get("method") == "submit":
            self.add_error("password2", "Compilare il campo") 

class LoginForm(forms.Form):

    username = forms.CharField(required=True)
    password1 = forms.CharField(required=True) 

    def clean(self):
        pass