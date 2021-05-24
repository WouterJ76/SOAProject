from django.shortcuts import render
from rest_framework import viewsets
from .models import Cat
from .serializers import CatSerializer

class CatView(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer