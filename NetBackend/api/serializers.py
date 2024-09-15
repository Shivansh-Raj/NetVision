from rest_framework import serializers
from django.contrib.auth.models import User
from .models import history

class userSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class historySerializer(serializers.ModelSerializer):
    class Meta:
        model = history
        fields = ['movieId','name','user']
        extra_kwargs = {'user_name':{'read_only':True}}


