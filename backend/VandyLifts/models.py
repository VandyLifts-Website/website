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

#Editor/Author: Yiu Tran
#Edit date: 10/7/2022
class SurveySubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    time_availability = models.ManyToManyField(TimeAvailability)
    max_matches = models.PositiveIntegerField()

    is_mentor = models.BooleanField(blank=True)
    is_mentee = models.BooleanField(blank=True)
    buddy = models.BooleanField(blank=True)
    guide_lifter = models.BooleanField(blank=True)
    newbie_lifter = models.BooleanField(blank=True)

    deadlift = models.BooleanField()
    squat = models.BooleanField()
    bench_press = models.BooleanField()


    class Gender(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female')
        NO_PREFERENCE = 'N', _('N/A')

    gender_preference = models.CharField(
        max_length=1,
        choices=Gender.choices,
        default=Gender.NO_PREFERENCE,
    )
    def person(self):
        if self.is_mentor:
            return 'mentor'
        elif self.is_mentee:
            return 'mentee'
        elif self.buddy:
            return 'buddy'
        elif self.guide_lifter:
            return 'guide lifter'
        elif self.newbie_lifter:
            return newbie_lifter

    def __str__(self):
        return f'{self.user} - {self.person()} - {self.organization} - [{", ".join([str(time) for time in self.time_availability.all()])}]'

#Editor/Author: Yiu Tran
#Edit date: 10/10/2022
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
