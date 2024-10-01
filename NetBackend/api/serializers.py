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
        fields = ['showId','user_name','watched_at']
        extra_kwargs = {'user_name': {'read_only': True}, 'watched_at': {'read_only': True}}

    def validate_showId(self, value):
        try:
            # value = int(value)
            if value <= 0:
                raise serializers.ValidationError("Show ID must be greater than 0.")
            user_name = self.context['request'].user
            history_exists = history.objects.filter(user_name=user_name, showId=value)
            print(f"Query: {history_exists.query}")
            print(f"Checking for showId {value} for user {user_name} ")
            if history.objects.filter(user_name=user_name, showId=value).exists():
                history.objects.filter(user_name=user_name, showId=value).delete()
                # raise serializers.ValidationError("This show is already in your history.")
            return value
        except Exception as e:
            print(f"Serializer error : {e}")
    def create(self, validated_data):
        user_name = self.context['request'].user
        validated_data['user_name'] = user_name
        # By writing this super we are calling parent's class create function
        # In this case parent is modelserializer
        # and create() is a build in function of serializer
        return super().create(validated_data)



