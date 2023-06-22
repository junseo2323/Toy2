from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from .serializer import SetSerializer
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .serializer import GetSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class SetView(generics.UpdateAPIView) :
    queryset = User.objects.all()
    lookup_field = 'username'
    permission_classes = (AllowAny,)
    serializer_class = SetSerializer

class GetView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    lookup_field = 'username'
    permission_classes = (AllowAny,)
    serializer_class = GetSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/settime/',
        '/api/token/refresh/',
        '/api/refresh/'
    ]
    return Response(routes)
 