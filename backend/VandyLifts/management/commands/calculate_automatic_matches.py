from django.core.management.base import BaseCommand, CommandError
from VandyLifts.models import Organization, SurveySubmission, Match, TimeAvailability
from django.contrib.auth.models import User
from VandyLifts.automatic_matcher import solve_automatic_matches

# Author: David Perez
# Start Date: 10/10/2022

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('organization_id', type=int)

    def handle(self, *args, **options):
        organization = Organization.objects.get(pk=options['organization_id'])
        mentors = organization.surveysubmission_set.filter(is_mentor=True).all()  # type: ignore
        mentees = organization.surveysubmission_set.filter(is_mentor=False).all()  # type: ignore
        times = TimeAvailability.objects.all()
        results = solve_automatic_matches(organization, mentors, mentees, times)
        print(results)
        for mentor, mentee, time_matches in results:
            match = Match(organization=organization, confirmed=False)
            match.save()
            match.people.add(mentor, mentee)


        
        self.stdout.write(self.style.SUCCESS('Testing '))


        # for poll_id in options['poll_ids']:
        #     try:
        #         poll = Poll.objects.get(pk=poll_id)
        #     except Poll.DoesNotExist:
        #         raise CommandError('Poll "%s" does not exist' % poll_id)

        #     poll.opened = False
        #     poll.save()

        #     self.stdout.write(self.style.SUCCESS('Successfully closed poll "%s"' % poll_id))