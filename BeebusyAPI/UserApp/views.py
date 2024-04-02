from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from UserApp.models import users
from UserApp.serializers import UserSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view  
from UserApp.models import users

# Create your views here.
@api_view(["GET", "POST", "PUT", "DELETE"])  
@csrf_exempt
def userApi(request, id=0):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        paginator.page_size = 5  # Nombre d'éléments par page
        users_data = users.objects.all()
        result_page = paginator.paginate_queryset(users_data, request)
        users_serializer = UserSerializer(result_page, many=True)
        return paginator.get_paginated_response(users_serializer.data)
    
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Utilisateur ajouté ! :D", safe=False)
        return JsonResponse("Echec de l'ajout... :/", safe=False)
    
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        try:
            user = users.objects.get(UserId=user_data['UserId'])
        except users.DoesNotExist:
            return JsonResponse("Utilisateur non trouvé :(", status=404)

        user_serializer = UserSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Utilisateur mis à jour ! :D", safe=False)
        return JsonResponse("Echec de la mise à jour :(", safe=False)
    
    elif request.method == 'DELETE':
        try:
            user = users.objects.get(UserId=id)
        except users.DoesNotExist:
            return JsonResponse("Utilisateur non trouvé :(", status=404)

        user.delete()
        return JsonResponse("Utilisateur supprimé.", safe=False)
 
def filter_users(request):
    # Récupérer les paramètres de requête pour le filtre
    first_name = request.GET.get('first_name')
    last_name = request.GET.get('last_name')
    age = request.GET.get('age')
    gender = request.GET.get('gender')
    city = request.GET.get('city')

    # Filtrer les utilisateurs en fonction des paramètres
    filtered_users = users.objects.all()
    if first_name:
        filtered_users = filtered_users.filter(UserSurname__icontains=first_name)
    if last_name:
        filtered_users = filtered_users.filter(UserLastname__icontains=last_name)
    if age:
        filtered_users = filtered_users.filter(UserAge=age)
    if gender:
        filtered_users = filtered_users.filter(UserGender=gender)
    if city:
        filtered_users = filtered_users.filter(UserCity__icontains=city)

    # Convertir les utilisateurs filtrés en format JSON
    users_data = [{'UserId': user.UserId, 'UserLastname': user.UserLastname, 'UserSurname': user.UserSurname, 'UserAge': user.UserAge, 'UserGender': user.UserGender, 'UserCity': user.UserCity} for user in filtered_users]

    # Retourner la réponse JSON
    return JsonResponse({'users': users_data})