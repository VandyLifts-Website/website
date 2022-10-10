from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


# Author: David Perez
# Start Date: 9/27/2022


DAY_OF_THE_WEEK = {
    '1': _('Monday'),
    '2': _('Tuesday'),
    '3': _('Wednesday'),
    '4': _('Thursday'),
    '5': _('Friday'),
    '6': _('Saturday'),
    '7': _('Sunday'),
}


class DayOfTheWeekField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['choices'] = tuple(sorted(DAY_OF_THE_WEEK.items()))
        kwargs['max_length'] = 1
        super(DayOfTheWeekField, self).__init__(*args, **kwargs)


# Create your models here.
class TimeAvailability(models.Model):
    day = DayOfTheWeekField()
    time = models.TimeField()

    class Meta:
        unique_together = ('day', 'time',)

    def __str__(self):
        return f'{self.get_day_display()} {self.time.strftime("%I:%M %p")}' # type: ignore


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


class SurveySubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_mentor = models.BooleanField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    time_availability = models.ManyToManyField(TimeAvailability)
    max_matches = models.PositiveIntegerField()

    def title(self):
        return 'mentor' if self.is_mentor else 'mentee'

    def __str__(self):
        return f'{self.user} - {self.title()} - {self.organization} - [{", ".join([str(time) for time in self.time_availability.all()])}]'


class Match(models.Model):
    people = models.ManyToManyField(SurveySubmission)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    confirmed = models.BooleanField()

    def names(self):
        return ', '.join(person.user.username for person in self.people.all())

    def status(self):
        return "confirmed" if self.confirmed else "not confirmed"

    def __str__(self):
        return f'[{self.names()}] - {self.organization} - {self.status()}'
