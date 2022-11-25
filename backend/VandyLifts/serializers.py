from numpy import source
from rest_framework import serializers, permissions
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
        fields = ('id', 'username', 'email')


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
    type_of_organization = serializers.CharField(
        source='get_type_of_organization_display', read_only=True)
    gender = serializers.CharField(source='get_gender_display', read_only=True)
    gender_preference = serializers.CharField(
        source='get_gender_preference_display', read_only=True)

    class Meta:
        model = Organization
        fields = ('__all__')


class SurveySubmissionValidator:
    def __call__(self, data):
        if data['organization'].type_of_organization == Organization.OrganizationType.MENTOR_MENTEE:
            if data['type_of_person'] not in [SurveySubmission.PersonType.MENTOR, SurveySubmission.PersonType.MENTEE]:
                raise serializers.ValidationError(
                    {'type_of_person': 'The type of Survey Submission should match the organization'})
        if data['organization'].type_of_organization == Organization.OrganizationType.BUDDY:
            if data['type_of_person'] not in [SurveySubmission.PersonType.BUDDY]:
                raise serializers.ValidationError(
                    {'type_of_person': 'The type of Survey Submission should match the organization'})
        if data['organization'].type_of_organization == Organization.OrganizationType.DAY_IN_THE_LIFE:
            if data['type_of_person'] not in [SurveySubmission.PersonType.GUIDE_LIFTER, SurveySubmission.PersonType.LEARNER_LIFER]:
                raise serializers.ValidationError(
                    {'type_of_person': 'The type of Survey Submission should match the organization'})

        if data['type_of_person'] != SurveySubmission.PersonType.MENTOR:
            if data['max_matches'] != 1:
                raise serializers.ValidationError(
                    {'max_matches': 'Only Mentors can have more than 1 match'})


class SurveySubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveySubmission
        fields = ('__all__')
        validators = [SurveySubmissionValidator()]


class SurveySubmissionReadSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    organization = OrganizationMinimalSerializer(read_only=True)
    time_availability = TimeAvailabilityReadSerializer(
        many=True, read_only=True)
    type_of_person = serializers.CharField(
        source='get_type_of_person_display', read_only=True)
    gender = serializers.CharField(source='get_gender_display', read_only=True)
    gender_preference = serializers.CharField(
        source='get_gender_preference_display', read_only=True)

    class Meta:
        model = SurveySubmission
        fields = ('__all__')


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('__all__')


class MatchReadSerializer(serializers.ModelSerializer):
    people = SurveySubmissionReadSerializer(many=True, read_only=True)
    times_matched = TimeAvailabilityReadSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = ('__all__')
