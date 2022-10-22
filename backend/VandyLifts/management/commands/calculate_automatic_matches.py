from django.core.management.base import BaseCommand, CommandError
from VandyLifts.models import Organization, Match
from VandyLifts.automatic_matcher_ortools import solve_automatic_matches

# Author: David Perez
# Start Date: 10/10/2022

class Command(BaseCommand):
    help = 'Create matches for organization'

    def add_arguments(self, parser):
        parser.add_argument('organization_id', type=int)

    def handle(self, *args, **options):
        # Get organization
        organization = Organization.objects.get(pk=options['organization_id'])

        # Get mentor's in organization
        mentors = organization.surveysubmission_set.filter(is_mentor=True).all()  # type: ignore

        # Get mentee's in organization
        mentees = organization.surveysubmission_set.filter(is_mentor=False).all()  # type: ignore

        # Get times of the organization
        times = organization.time_choices.all()

        # Get automatic matches
        results = solve_automatic_matches(organization, mentors, mentees, times)
        self.stdout.write(self.style.SUCCESS('Matches: %s' % results))

        # Add matches to database
        for mentor, mentee, time_matches in results:
            match = Match(organization=organization, confirmed=False)
            match.save()
            match.people.add(mentor, mentee)

        self.stdout.write(self.style.SUCCESS('Added all matches'))
