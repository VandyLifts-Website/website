from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import OrganizationSerializer, OrganizationReadSerializer, SurveySubmissionSerializer, \
    SurveySubmissionReadSerializer, MatchSerializer, MatchReadSerializer, \
    TimeAvailabilityCreateSerializer, TimeAvailabilityReadSerializer
from .models import Organization, SurveySubmission, Match, TimeAvailability

# Author: David Perez
# Start Date: 9/27/2022

# Create your views here.


class TimeAvailabilityView(viewsets.ModelViewSet):
    queryset = TimeAvailability.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return TimeAvailabilityCreateSerializer
        return TimeAvailabilityReadSerializer


class OrganizationView(viewsets.ModelViewSet):
    queryset = Organization.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return OrganizationReadSerializer
        if self.action == 'retrieve':
            return OrganizationReadSerializer
        return OrganizationSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def calculate_automatic_matches(self, request, pk=None):
        # run "python ./manage.py calculate_automatic_matches
        # <organization_id>"
        return Response("")


class SurveySubmissionView(viewsets.ModelViewSet):
    queryset = SurveySubmission.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return SurveySubmissionReadSerializer
        if self.action == 'retrieve':
            return SurveySubmissionReadSerializer
        return SurveySubmissionSerializer


class MatchView(viewsets.ModelViewSet):
    queryset = Match.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return MatchReadSerializer
        if self.action == 'retrieve':
            return MatchReadSerializer
        return MatchSerializer
