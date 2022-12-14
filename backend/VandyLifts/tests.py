import datetime
import csv
import cProfile
import pstats
from pstats import SortKey
from django.db import IntegrityError, transaction
from django.test import TestCase, override_settings
from faker import Faker

# Author: David Perez
# Start Date: 10/17/2022

# Create your tests here.
from django.test import TestCase
from VandyLifts.automatic_matcher_ortools import solve_automatic_matches
from VandyLifts.models import TimeAvailability, User, Organization, SurveySubmission

fake = Faker('en_US')
Faker.seed(4321)

def handle_user(name, email, password, org, times, person_type, preferences, num_matches, gender_preference, gender, monday, tuesday, wednesday, thursday, friday, saturday, sunday):
    # Create user if the user does not already exist
    name = fake.unique.name()
    try:
        with transaction.atomic():
            user = User.objects.create_user(name.replace(
                ' ', '_'), email=email, password=password)
    except IntegrityError:
        print(f"{name} has already registered as a user")
        with transaction.atomic():
            user = User.objects.get(username=name.replace(' ', '_'))

    # Submit a survey
    try:
        with transaction.atomic():
            ss = SurveySubmission.objects.create(user=user, organization=org, max_matches=3,  name="TEST", type_of_person=person_type,
                                                 gender=SurveySubmission.Gender.MALE, gender_preference=SurveySubmission.GenderPreference.ALL)
    except IntegrityError:
        print(f"{name} has already submitted a mentor form")
        return
    for day, availability in [('1', monday), ('2', tuesday), ('3', wednesday), ('4', thursday), ('5', friday), ('6', saturday), ('7', sunday)]:
        for availability in availability.split(', '):
            time = None
            if availability == "X" or availability == "":
                continue
            elif availability == "7-8 AM":
                time = datetime.time(hour=7)
            elif availability == "8-9 AM":
                time = datetime.time(hour=8)
            elif availability == "9-10 AM":
                time = datetime.time(hour=9)
            elif availability == "10AM-11AM" or availability == "10-11 AM":
                time = datetime.time(hour=10)
            elif availability == "11AM - 12 PM":
                time = datetime.time(hour=11)
            elif availability == "12-1 PM" or availability == "12-1PM":
                time = datetime.time(hour=12)
            elif availability == "1-2 PM":
                time = datetime.time(hour=13)
            elif availability == "2-3 PM":
                time = datetime.time(hour=14)
            elif availability == "3-4 PM":
                time = datetime.time(hour=15)
            elif availability == "4-5 PM" or availability == "4-5PM":
                time = datetime.time(hour=16)
            elif availability == "5-6 PM":
                time = datetime.time(hour=17)
            elif availability == "6-7 PM" or availability == "6-7P M":
                time = datetime.time(hour=18)
            elif availability == "7-8 PM":
                time = datetime.time(hour=19)
            elif availability == "8-9 PM":
                time = datetime.time(hour=20)
            elif availability == "9-10 PM":
                time = datetime.time(hour=21)
            else:
                print("Availability not recognized", availability)
                continue
            ss.time_availability.add(*times.filter(day=day, time=time))

    # print("email:", email)  # check
    # print("name:", name)  # check
    # print("preferences:", preferences)
    # print("num_mentees:", num_mentees)
    # print("gender_preference:", gender_preference)
    # print("monday:", monday)
    # print("tuesday:", tuesday)
    # print("wednesday:", wednesday)
    # print("thursday:", thursday)
    # print("friday:", friday)
    # print("saturday:", saturday)
    # print("sunday:", sunday)
    # print("gender:", gender)


@override_settings(PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'])
class MyTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up data for the whole TestCase

        # Create Admin User
        cls.password = 'UnitTestPassword'
        cls.email = 'david.a.perez@vanderbilt.edu'
        cls.user = User.objects.create_superuser(
            'UnitTestUser', cls.email, cls.password)

    def test1(self):
        # Create Organization
        org = Organization.objects.create(
            title='UnitTestOrg', type_of_organization=Organization.OrganizationType.MENTOR_MENTEE, owner=self.user, max_time_matches=15, num_time_matches_weight=1, num_matches_weight=100)    
        
        # Add all time choices to the organization
        times = TimeAvailability.objects.all()
        org.time_choices.set(times)

        # Create two users
        user1 = User.objects.create_user('user01', self.email, self.password)
        user2 = User.objects.create_user('user02', self.email, self.password)

        # Sumbit a survey for both users
        ss1 = SurveySubmission.objects.create(
            user=user1, organization=org, max_matches=1, name="TEST", type_of_person=SurveySubmission.PersonType.MENTOR, gender=SurveySubmission.Gender.MALE, gender_preference=SurveySubmission.GenderPreference.ALL)
        ss2 = SurveySubmission.objects.create(
            user=user2, organization=org, max_matches=1, name="TEST", type_of_person=SurveySubmission.PersonType.MENTEE, gender=SurveySubmission.Gender.MALE, gender_preference=SurveySubmission.GenderPreference.ALL)

        # Give both users the same time availability
        ss1.time_availability.set(times.filter(
            day='1', time=datetime.time(hour=15)))
        ss2.time_availability.set(times.filter(
            day='1', time=datetime.time(hour=15)))

        assert len(solve_automatic_matches(org.pk)) == 1

    def test2(self):
        # with cProfile.Profile() as pr:
        if True:
            # Create Organization
            org = Organization.objects.create(
                title='UnitTestOrg', type_of_organization=Organization.OrganizationType.MENTOR_MENTEE, owner=self.user, max_time_matches=15, num_time_matches_weight=1, num_matches_weight=100)    
            
            # Add all time choices to the organization
            times = TimeAvailability.objects.all()
            org.time_choices.set(times)

            mentors_filename = 'mentors.csv'

            with open(mentors_filename, 'r') as csvfile:
                datareader = csv.reader(csvfile)

                next(datareader)

                for _, email, name, _, _, _, preferences, num_mentees, _, _, gender_preference, _, _, _, _, monday, tuesday, wednesday, thursday, friday, saturday, sunday, _, _, _, _, _, _, _, gender in datareader:
                    handle_user(name, email, self.password, org, times, SurveySubmission.PersonType.MENTOR, preferences, num_mentees,
                                gender_preference, gender, monday, tuesday, wednesday, thursday, friday, saturday, sunday)

            mentees_filename = 'mentees.csv'

            with open(mentees_filename, 'r') as csvfile:
                datareader = csv.reader(csvfile)

                next(datareader)

                for _, name, email, _, preferences, _, num_mentors, _, gender_preference, _, _, _, _, monday, tuesday, wednesday, thursday, friday, saturday, sunday, _, _, _, _, _, _, _, _, gender, _, _ in datareader:
                    handle_user(name, email, self.password, org, times, SurveySubmission.PersonType.MENTEE, preferences, num_mentors,
                                gender_preference, gender, monday, tuesday, wednesday, thursday, friday, saturday, sunday)

            solve_automatic_matches(org.pk)
        # sortby = SortKey.CUMULATIVE
        # ps = pstats.Stats(pr).sort_stats(sortby)
        # ps.print_stats(200)

    def test3(self):
        # with cProfile.Profile() as pr:
        if True:
            # Create Organization
            org = Organization.objects.create(
                title='UnitTestOrg', type_of_organization=Organization.OrganizationType.BUDDY, owner=self.user, max_time_matches=15, num_time_matches_weight=1, num_matches_weight=100)    
            
            # Add all time choices to the organization
            times = TimeAvailability.objects.all()
            org.time_choices.set(times)

            mentors_filename = 'mentors.csv'

            with open(mentors_filename, 'r') as csvfile:
                datareader = csv.reader(csvfile)

                next(datareader)

                for _, email, name, _, _, _, preferences, num_mentees, _, _, gender_preference, _, _, _, _, monday, tuesday, wednesday, thursday, friday, saturday, sunday, _, _, _, _, _, _, _, gender in datareader:
                    handle_user(name, email, self.password, org, times, SurveySubmission.PersonType.BUDDY, preferences, num_mentees,
                                gender_preference, gender, monday, tuesday, wednesday, thursday, friday, saturday, sunday)

            mentees_filename = 'mentees.csv'

            with open(mentees_filename, 'r') as csvfile:
                datareader = csv.reader(csvfile)

                next(datareader)

                for _, name, email, _, preferences, _, num_mentors, _, gender_preference, _, _, _, _, monday, tuesday, wednesday, thursday, friday, saturday, sunday, _, _, _, _, _, _, _, _, gender, _, _ in datareader:
                    handle_user(name, email, self.password, org, times, SurveySubmission.PersonType.BUDDY, preferences, num_mentors,
                                gender_preference, gender, monday, tuesday, wednesday, thursday, friday, saturday, sunday)

            solve_automatic_matches(org.pk)
        # sortby = SortKey.CUMULATIVE
        # ps = pstats.Stats(pr).sort_stats(sortby)
        # ps.print_stats(200)

    def test4(self):
        # Create Organization
        org = Organization.objects.create(
            title='UnitTestOrg', type_of_organization=Organization.OrganizationType.BUDDY, owner=self.user, max_time_matches=15, num_time_matches_weight=1, num_matches_weight=100)    
        
        # Add all time choices to the organization
        times = TimeAvailability.objects.all()
        org.time_choices.set(times)

        # Create two users
        user1 = User.objects.create_user('user01', self.email, self.password)
        user2 = User.objects.create_user('user02', self.email, self.password)

        # Sumbit a survey for both users
        ss1 = SurveySubmission.objects.create(
            user=user1, organization=org, max_matches=1, name="TEST", type_of_person=SurveySubmission.PersonType.BUDDY, gender=SurveySubmission.Gender.MALE, gender_preference=SurveySubmission.GenderPreference.ALL)
        ss2 = SurveySubmission.objects.create(
            user=user2, organization=org, max_matches=1, name="TEST", type_of_person=SurveySubmission.PersonType.BUDDY, gender=SurveySubmission.Gender.MALE, gender_preference=SurveySubmission.GenderPreference.ALL)

        # Give both users the same time availability
        ss1.time_availability.set(times.filter(
            day='1', time=datetime.time(hour=15)))
        ss2.time_availability.set(times.filter(
            day='1', time=datetime.time(hour=15)))

        assert len(solve_automatic_matches(org)) == 1
