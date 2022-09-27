from rest_framework import serializers
from .models import Organization, SurveySubmission, Match
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('id', 'title', 'owner', 'members')


class OrganizationReadSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Organization
        fields = ('id', 'title', 'owner', 'members')


class SurveySubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveySubmission
        fields = ('id', 'user', 'is_mentor', 'organization')


class SurveySubmissionReadSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    organization = OrganizationSerializer(read_only=True)

    class Meta:
        model = SurveySubmission
        fields = ('id', 'user', 'is_mentor', 'organization')


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('id', 'people')


class MatchReadSerializer(serializers.ModelSerializer):
    people = SurveySubmissionReadSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = ('id', 'people')
