from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class history(models.Model):
    user_name=models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    movieId = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
