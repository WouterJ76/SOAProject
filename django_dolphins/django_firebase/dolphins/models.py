from django.db import models

class Dolphin(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    age = models.CharField(max_length=50)

    def __str__(self):
        return self.name
