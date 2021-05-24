from rest_framework import serializers
from .models import Dolphin

class DolphinSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dolphin
        fields = ('id', 'name', 'color', 'age')