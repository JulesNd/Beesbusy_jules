from rest_framework import serializers
from UserApp.models import users
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ['UserId', 'UserLastname', 'UserSurname', 'UserAge', 'UserGender', 'UserCity']