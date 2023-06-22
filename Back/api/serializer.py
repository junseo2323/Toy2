from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ReadOnlyField

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Frontend에서 더 필요한 정보가 있다면 여기에 추가적으로 작성하면 됩니다. token["is_superuser"] = user.is_superuser 이런식으로요.
        token['username'] = user.username
        token['email'] = user.email
        token['count_wake'] = user.count_wake
        token['nickname'] = user.nickname
        token['wake_time'] = str(user.wake_time)
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'nickname' , 'email','password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            nickname = validated_data['nickname'],
            email = validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('wake_time','username')
    
    def update(self,instance, validated_data):
        user = User.objects.get(username=validated_data['username'])
        user.wake_time = validated_data['wake_time']
        user.save()
        return user

class GetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('wake_time','count_wake')
    
    def update(self,instance, validated_data):
        user = User.objects.get(username=validated_data['username'])
        return user
    