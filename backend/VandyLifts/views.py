from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrganizationSerializer, OrganizationReadSerializer, SurveySubmissionSerializer, SurveySubmissionReadSerializer, MatchSerializer, MatchReadSerializer
from .models import Organization, SurveySubmission, Match


# Create your views here.
class OrganizationView(viewsets.ModelViewSet):
    queryset = Organization.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return OrganizationReadSerializer
        if self.action == 'retrieve':
            return OrganizationReadSerializer
        return OrganizationSerializer


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
