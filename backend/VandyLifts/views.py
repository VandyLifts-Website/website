import threading
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .serializers import OrganizationSerializer, OrganizationReadSerializer, SurveySubmissionSerializer, \
    SurveySubmissionReadSerializer, MatchSerializer, MatchReadSerializer, \
    TimeAvailabilityCreateSerializer, TimeAvailabilityReadSerializer, UserSerializer
from .models import Organization, SurveySubmission, Match, TimeAvailability
from .automatic_matcher_ortools import solve_automatic_matches
from django.core import mail

# Author: David Perez
# Start Date: 9/27/2022

# Create your views here.


# class TimeAvailabilityView(viewsets.ModelViewSet):
#     queryset = TimeAvailability.objects.all()
#     filterset_fields = ['day', 'time']

#     def get_serializer_class(self):
#         if self.action == 'create':
#             return TimeAvailabilityCreateSerializer
#         return TimeAvailabilityReadSerializer


class TimeAvailabilityView(viewsets.ReadOnlyModelViewSet):
    queryset = TimeAvailability.objects.all()
    filterset_fields = ['day', 'time']

    def get_serializer_class(self):
        return TimeAvailabilityReadSerializer


class IsAdminOrReadOnly(BasePermission):
    message = 'You are not allowed to modify this unless you are an Admin.'

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or (request.user and request.user.is_staff)


class OrganizationView(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    permission_classes = [IsAdminOrReadOnly]

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
    
    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def send_emails(self, request, pk=None):
        connection = mail.get_connection()
        if(not connection.open()):
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
        matches = Match.objects.filter(organization=pk, confirmed=False).all()
        for match in matches:
            times = "\n".join([str(time) for time in match.times_matched.all()])
            matched_people = ", ".join([person.name for person in match.people.all()])
            message = f"Hi, {matched_people} \n\nYou've been successfully matched! Your partner(s) are CC'd on this email. Below is your workout availability...\n{times}\n\n Regards,\nVandyLifts"
            email = mail.EmailMessage("VandyLifts Match Notification", 
            message, 
            'vandylifts@gmail.com',
            [person.user.email for person in match.people.all()],
            connection=connection)
            email.send()
            match.confirmed = True
            match.save()
        connection.close()
        return Response("Email Sent")
         
        


class IsAdminOrSurveySubmissionUser(BasePermission):
    message = 'You can only access your own Survey Submissions unless you are an Admin.'

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        return obj.user == request.user

    def has_permission(self, request, view):
        if request.user and request.user.is_staff:
            return True
        if view.action == "create" and "user" in request.data and request.data["user"] == request.user.id:
            return True
        if view.action == 'list' and "user" in request.query_params and request.query_params["user"] == str(request.user.id):
            return True
        if view.action in ["retrieve", "update", "partial_update", "destroy"]:
            if view.action in ["update", "partial_update"] and "user" in request.data and request.data["user"] != request.user.id:
                return False

            # Defer to has_object_permission
            return True
        return False


class SurveySubmissionView(viewsets.ModelViewSet):
    queryset = SurveySubmission.objects.all()
    # queryset = SurveySubmission.objects.prefetch_related('user').prefetch_related('organization').prefetch_related('time_availability').all()
    filterset_fields = ['organization', 'type_of_person', 'user']
    permission_classes = [IsAuthenticated,
                          IsAdminOrSurveySubmissionUser]

    def get_serializer_class(self):
        if self.action == 'list':
            return SurveySubmissionReadSerializer
        if self.action == 'retrieve':
            return SurveySubmissionReadSerializer
        return SurveySubmissionSerializer


class IsAdminOrMatchUser(BasePermission):
    message = 'You can only access your own Matches unless you are an Admin'

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        return obj.people.filter(user=request.user).exists()

    def has_permission(self, request, view):
        if request.user and request.user.is_staff:
            return True
        if view.action == "create" and "people" in request.data and request.user.id in request.data["people"]:
            return True
        if view.action == "list" and "people" in request.query_params:
            try:
                if SurveySubmission.objects.get(pk=request.query_params["people"]).user == request.user:
                    return True
            except ObjectDoesNotExist:
                pass
        if view.action in ["retrieve", "update", "partial_update", "destroy"]:
            if view.action in ["update", "partial_update"] and "people" in request.data:
                # Some unsafety exists related to a user editing a match to belong to another pair
                # Since users normally can't edit their matches this shouldn't happen
                # Therefore, it is okay to always forbid editing
                return False

            # Defer to has_object_permission
            return True
        return False


class MatchView(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    # queryset = Match.objects.prefetch_related('times_matched').prefetch_related('organization').prefetch_related('people').prefetch_related('people__time_availability').prefetch_related('people__user').prefetch_related('people__organization').all()
    # queryset = Match.objects.prefetch_related(
    #     Prefetch('times_matched'),
    #     Prefetch('organization'),
    #      Prefetch('people', queryset=SurveySubmission.objects.prefetch_related('time_availability').select_related('user').select_related('organization'))).all()
    # queryset = Match.objects.prefetch_related(
    #     Prefetch('times_matched'),
    #     Prefetch('organization'),
    #     Prefetch('people', queryset=SurveySubmissionView.queryset)).all()
    filterset_fields = ['organization', 'confirmed', 'people']
    permission_classes = [IsAuthenticated,
                          IsAdminOrReadOnly, IsAdminOrMatchUser]

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
    @method_decorator(ensure_csrf_cookie)
    def get_user_data(self, request):
        return Response({
            "is_logged_in": request.user.is_authenticated,
            "is_admin": request.user.is_staff and request.user.is_superuser,
            "id": request.user.id,
            "email": getattr(request.user, 'email', None),
            "first_name": getattr(request.user, 'first_name', None),
            "last_name": getattr(request.user, 'last_name', None),
        })
