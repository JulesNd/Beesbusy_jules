from django.db import models

# Create your models here.
class users(models.Model): 
    UserId = models.AutoField(primary_key=True)
    UserLastname = models.CharField(max_length=500)
    UserSurname = models.CharField(max_length=500)
    UserAge = models.PositiveIntegerField()
    UserGender = models.CharField(max_length=10) 
    UserCity = models.CharField(max_length=500)
