from django.shortcuts import render
from rest_framework import viewsets
from .models import Dolphin
from .serializers import DolphinSerializer


class DolphinView(viewsets.ModelViewSet):
    queryset = Dolphin.objects.all()
    serializer_class = DolphinSerializer

