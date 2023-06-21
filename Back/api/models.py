from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    #추가 필드 구성
    nickname = models.CharField(max_length=100)
    wake_time = models.TimeField(auto_now=False,null=True)
    count_wake = models.IntegerField(default=0)


    