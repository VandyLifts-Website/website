from rest_framework import serializers
from .models import Organization, SurveySubmission, Match, TimeAvailability
from django.contrib.auth.models import User

# Author: David Perez
# Start Date: 9/27/2022


class TimeAvailabilityReadSerializer(serializers.ModelSerializer):
    time = serializers.TimeField(read_only=True)
    day = serializers.CharField(source='get_day_display', read_only=True)

    class Meta:
        model = TimeAvailability
        fields = ('__all__')


class TimeAvailabilityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeAvailability
        fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('__all__')


class OrganizationMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('id', 'title')


class OrganizationReadSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
    time_availability = TimeAvailabilityReadSerializer(
        many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ('__all__')


class SurveySubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveySubmission
        fields = ('__all__')


class SurveySubmissionReadSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    organization = OrganizationMinimalSerializer(read_only=True)
    time_availability = TimeAvailabilityReadSerializer(
        many=True, read_only=True)

    class Meta:
        model = SurveySubmission
        fields = ('__all__')


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('__all__')


class MatchReadSerializer(serializers.ModelSerializer):
    people = SurveySubmissionReadSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = ('__all__')
