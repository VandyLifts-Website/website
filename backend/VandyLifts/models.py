from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


# Author: David Perez
# Start Date: 9/27/2022


# Editor/Author: Yiu Tran
# Edit date: 10/21/2022
# Create your models here.
class TimeAvailability(models.Model):
    class DayOfTheWeek(models.TextChoices):
        MONDAY = '1', _('Monday')
        TUESDAY = '2', _('Tuesday')
        WEDNESDAY = '3', _('Wednesday')
        THURSDAY = '4', _('Thursday')
        FRIDAY = '5', _('Friday')
        SATUDAY = '6', _('Saturday')
        SUNDAY = '7', _('Sunday')
    day = models.CharField(
        max_length=1,
        choices=DayOfTheWeek.choices,
    )
    time = models.TimeField()

    class Meta:
        unique_together = ('day', 'time',)

    def __str__(self):
        return f'{self.get_day_display()} {self.time.strftime("%I:%M %p")}'  # type: ignore


class Organization(models.Model):
    title = models.CharField(max_length=120, unique=True)
    owner = models.ForeignKey(
        User, related_name='owner_set', on_delete=models.CASCADE)
    members = models.ManyToManyField(User, through='SurveySubmission')
    time_choices = models.ManyToManyField(TimeAvailability)
    max_time_matches = models.PositiveIntegerField()
    num_time_matches_weight = models.PositiveIntegerField(default=1)
    num_matches_weight = models.PositiveIntegerField(default=10)
    matched_mentors_weight = models.PositiveIntegerField(default=10)
    matched_mentees_weight = models.PositiveIntegerField(default=10)
    matched_preferences_weight = models.PositiveIntegerField(default=2)


    class OrganizationType(models.TextChoices):
        MENTOR_MENTEE = '1', _('Mentor/Mentee')
        BUDDY = '2', _('Buddy')
        DAY_IN_THE_LIFE = '3', _('Day In The Life')

    type_of_organization = models.CharField(
        max_length=1,
        choices=OrganizationType.choices,
    )

    def names(self):
        return ', '.join(person.username for person in self.members.all())

    def __str__(self):
        return self.title

# Editor/Author: Yiu Tran
# Edit date: 10/7/2022
# Edit date: 10/21/2022
class SurveySubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    time_availability = models.ManyToManyField(TimeAvailability)
    max_matches = models.PositiveIntegerField()
    name = models.CharField(max_length=50)
    phone_number = PhoneNumberField()

    class PersonType(models.TextChoices):
        MENTOR = '1', _('Mentor')
        MENTEE = '2', _('Mentee')
        BUDDY = '3', _('Buddy')
        GUIDE_LIFTER = '4', _('Guide Lifter')
        LEARNER_LIFER = '5', _('Learner Lifter')

    type_of_person = models.CharField(
        max_length=1,
        choices=PersonType.choices,
    )

    general_lifting = models.BooleanField(default=False)
    power_lifting = models.BooleanField(default=False)
    body_building = models.BooleanField(default=False)
    olympic_lifting = models.BooleanField(default=False)

    class Gender(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female')
        NON_BINARY = 'N', _('Non Binary')

    gender = models.CharField(
        max_length=1,
        choices=Gender.choices,
    )

    class GenderPreference(models.TextChoices):
        SAME_GENDER = '1', _('Same')
        ALL = '2', _('All')

    gender_preference = models.CharField(
        max_length=1,
        choices=GenderPreference.choices,
    )

    ### Not required for automatic matching

    # Mentee
    changing_mentors = models.BooleanField(default=False)

    # Mentor
    hours_per_week = models.PositiveIntegerField(null=True, blank=True)

    # Buddy
    why_interested_in_buddy = models.TextField(blank=True)
    want_partner_of_same_experience = models.BooleanField(default=False)

    # All
    prior_experience = models.TextField(blank=True)
    interests = models.TextField(blank=True)
    else_involved = models.TextField(blank=True)
    anything_else = models.TextField(blank=True)
    questions = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'organization', 'type_of_person')

    def __str__(self):
        return f'{self.user} - {self.get_type_of_person_display()} - {self.organization} - [{", ".join([str(time) for time in self.time_availability.all()])}]' # type: ignore

# Editor/Author: Yiu Tran
# Edit date: 10/10/2022
class Match(models.Model):
    people = models.ManyToManyField(SurveySubmission)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    confirmed = models.BooleanField(default=False)
    times_matched = models.ManyToManyField(TimeAvailability)

    def names(self):
        return ', '.join(person.user.username for person in self.people.all())

    def status(self):
        return "confirmed" if self.confirmed else "not confirmed"

    def __str__(self):
        return f'[{self.names()}] - {self.organization} - {self.status()} [{", ".join([str(time) for time in self.times_matched.all()])}]'

@receiver(models.signals.pre_delete, sender=SurveySubmission)
def cascade_delete_match(sender, instance, **kwargs):
   instance.match_set.all().delete()
