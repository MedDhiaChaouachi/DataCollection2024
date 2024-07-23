from rest_framework.serializers import ModelSerializer
from .models import Blog, Comment, Profile
from django.contrib.auth.models import User
from rest_framework import serializers


class BlogSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'date_created',
            'date_updated',
            'content',
            'image',
            'category',
            'publish_status',
            'likes',
            'total_likes',
            'summary',
            'author_name',
            'author_photo',
            'author_bio',
            'reading_time',
            'comment_count'
        ]


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id',
            'username',
            'body',
            'date_format',
            'user_photo'
        ]


class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'body',
            'blog',
            'user'
        ]




class ProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Profile
        fields = ['id', 'username', 'photo', 'email', 'password', 'bio', 'role']

    def create(self, validated_data):
        user_data = {
            'username': validated_data.pop('username'),
            'email': validated_data.pop('email'),
            'password': validated_data.pop('password')
        }
        user = User.objects.create_user(**user_data)
        profile_data = validated_data
        profile_data['user'] = user
        profile = Profile.objects.create(**profile_data)
        return profile

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password:
            instance.user.set_password(password)
            instance.user.save()
        return instance