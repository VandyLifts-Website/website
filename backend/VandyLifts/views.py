import threading
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from .serializers import OrganizationSerializer, OrganizationReadSerializer, SurveySubmissionSerializer, \
    SurveySubmissionReadSerializer, MatchSerializer, MatchReadSerializer, \
    TimeAvailabilityCreateSerializer, TimeAvailabilityReadSerializer, UserSerializer
from .models import Organization, SurveySubmission, Match, TimeAvailability
from .automatic_matcher_ortools import solve_automatic_matches

# Author: David Perez
# Start Date: 9/27/2022

# Create your views here.


class TimeAvailabilityView(viewsets.ModelViewSet):
    queryset = TimeAvailability.objects.all()
    filterset_fields = ['day', 'time']

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
        if pk is not None:
            p = threading.Thread(target=solve_automatic_matches, args=(pk,))
            p.start()
            return Response("Automatic Matching begun")
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class IsSurveySubmissionUser(BasePermission):
    message = 'You can only access your own Survey Submissions.'

    def has_object_permission(self, request, view, obj):
        if obj.user is None:
            obj.user = request.user
        return obj.user == request.user

    def has_permission(self, request, view):
        return view.action != 'list'


class SurveySubmissionView(viewsets.ModelViewSet):
    queryset = SurveySubmission.objects.all()
    # queryset = SurveySubmission.objects.prefetch_related('user').prefetch_related('organization').prefetch_related('time_availability').all()
    filterset_fields = ['organization', 'type_of_person']
    permission_classes = [IsAuthenticated,
                          IsSurveySubmissionUser | IsAdminUser]

    def get_serializer_class(self):
        if self.action == 'list':
            return SurveySubmissionReadSerializer
        if self.action == 'retrieve':
            return SurveySubmissionReadSerializer
        return SurveySubmissionSerializer


class MatchView(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    filterset_fields = ['organization', 'confirmed']

    def get_serializer_class(self):
        if self.action == 'list':
            return MatchReadSerializer
        if self.action == 'retrieve':
            return MatchReadSerializer
        return MatchSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['get'], permission_classes=[])
    def get_user_data(self, request):
        return Response({
            "is_logged_in": request.user.is_authenticated,
            "is_admin": request.user.is_staff and request.user.is_superuser
        })
