from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class TimeAvailabilty(models.Model):
    # day = # Enum of day
    time = models.TimeField


class Organization(models.Model):
    title = models.CharField(max_length=120)
    owner = models.ForeignKey(User, related_name='owner_set', on_delete=models.CASCADE)
    members = models.ManyToManyField(User, through='SurveySubmission')
    time_choices = models.ManyToManyField(TimeAvailabilty)

    def names(self):
        return ', '.join(person.username for person in self.members.all())

    def _str_(self):
        return self.title


class SurveySubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_mentor = models.BooleanField() # Becomes enum
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    time_availibily = models.ManyToManyField(TimeAvailabilty)


class Match(models.Model):
    # person1 = models.ForeignKey(User, related_name="person1", on_delete=models.CASCADE)
    # person2 = models.ForeignKey(User, related_name="person2", on_delete=models.CASCADE)
    people = models.ManyToManyField(SurveySubmission)
    # survey_submission = models.ForeignKey(SurveySubmission, on_delete=models.CASCADE)

    def names(self):
        return ', '.join(person.user.username for person in self.people.all())

    def _str_(self):
        return f'{self.names()}'
