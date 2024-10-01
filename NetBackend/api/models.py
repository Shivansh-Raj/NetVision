from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class history(models.Model):
    user_name=models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    showId = models.CharField(max_length=50)
    watched_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return self.showId
