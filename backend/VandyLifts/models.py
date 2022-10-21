from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


# Author: David Perez
# Start Date: 9/27/2022


# Editor/Author: Yiu Tran
# Edit date: 10/21/2022
# Create your models here.
class TimeAvailability(models.Model):
    class Day(models.IntegerChoices):
        MONDAY = 1, _('Monday')
        TUESDAY = 2, _('Tuesday')
        WEDNESDAY = 3, _('Wednesday')
        THURSDAY = 4, _('Thursday')
        FRIDAY = 5, _('Friday')
        SATUDAY = 6, _('Saturday')
        SUNDAY = 7, _('Sunday')
    day = models.IntegerChoices(
        choices=Day.choices,
    )
    time = models.TimeField()

    class Meta:
        unique_together = ('day', 'time',)

    def __str__(self):
        return f'{self.day()} {self.time.strftime("%I:%M %p")}'  # type: ignore


class Organization(models.Model):
    title = models.CharField(max_length=120, unique=True)
    owner = models.ForeignKey(
        User, related_name='owner_set', on_delete=models.CASCADE)
    members = models.ManyToManyField(User, through='SurveySubmission')
    time_choices = models.ManyToManyField(TimeAvailability)
    max_time_matches = models.PositiveIntegerField()
    num_time_matches_weight = models.PositiveIntegerField()
    num_matches_weight = models.PositiveIntegerField()

    def names(self):
        return ', '.join(person.username for person in self.members.all())

    def __str__(self):
        return self.title

# Editor/Author: Yiu Tran
# Edit date: 10/7/2022


class SurveySubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    time_availability = models.ManyToManyField(TimeAvailability)
    max_matches = models.PositiveIntegerField()

    name = models.CharField(max_length=50)

    class Categorization_of_person(models.IntegerChoices):
        MENTOR = 1, _('Mentor')
        MENTEE = 2, _('Mentee')
        BUDDY = 3, _('Buddy')
        GUIDE_LIFTER = 4, _('Guide Lifter')
        LEARNER_LIFER = 5, _('Learner Lifter')

    type_of_person = models.IntegerChoices(
        choices=Categorization_of_person.choices,
    )

    power_lifting = models.BooleanField(default=False)
    body_building = models.BooleanField(default=False)
    olympic_lifting = models.BooleanField(default=False)

    class Gender(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female')
        NON_BINARY = 'B', _('Non Binary')

    gender = models.CharField(
        max_length=1,
        choices=Gender.choices,
    )

    class GenderPreference(models.IntegerChoices):
        SAME_GENDER = 1, _('Same')
        ALL = 2, _('All')

    gender_preference = models.IntegerChoices(
        choices=GenderPreference.choices,
        default=GenderPreference.ALL,
    )

    def __str__(self):
        return f'{self.user} - {self.type_of_person()} - {self.organization} - [{", ".join([str(time) for time in self.time_availability.all()])}]'

# Editor/Author: Yiu Tran
# Edit date: 10/10/2022


class Match(models.Model):
    people = models.ManyToManyField(SurveySubmission)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    confirmed = models.BooleanField(default=False)

    def names(self):
        return ', '.join(person.user.username for person in self.people.all())

    def status(self):
        return "confirmed" if self.confirmed else "not confirmed"

    def __str__(self):
        return f'[{self.names()}] - {self.organization} - {self.status()}'
