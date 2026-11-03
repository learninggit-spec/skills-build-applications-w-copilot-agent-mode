from django.core.management.base import BaseCommand
from django.utils import timezone

from tracker.models import User, Team, Activity, Workout, Leaderboard


class Command(BaseCommand):
    help = 'Populate octofit_db with test data'

    def handle(self, *args, **kwargs):
        user1, _ = User.objects.update_or_create(
            username='alice',
            defaults={
                'email': 'alice@example.com',
                'first_name': 'Alice',
                'last_name': 'Smith',
            },
        )
        user2, _ = User.objects.update_or_create(
            username='bob',
            defaults={
                'email': 'bob@example.com',
                'first_name': 'Bob',
                'last_name': 'Jones',
            },
        )
        user3, _ = User.objects.update_or_create(
            username='carol',
            defaults={
                'email': 'carol@example.com',
                'first_name': 'Carol',
                'last_name': 'Lee',
            },
        )

        team1, _ = Team.objects.update_or_create(name='Team Alpha')
        team2, _ = Team.objects.update_or_create(name='Team Beta')
        team1.members.set([user1, user2])
        team2.members.set([user3])

        Activity.objects.update_or_create(
            user=user1,
            activity_type='run',
            team=team1,
            defaults={
                'duration': 30,
                'distance': 5.0,
                'date': timezone.now().date(),
            },
        )
        Activity.objects.update_or_create(
            user=user2,
            activity_type='cycle',
            team=team1,
            defaults={
                'duration': 45,
                'distance': 20.0,
                'date': timezone.now().date(),
            },
        )
        Activity.objects.update_or_create(
            user=user3,
            activity_type='swim',
            team=team2,
            defaults={
                'duration': 60,
                'distance': 2.0,
                'date': timezone.now().date(),
            },
        )

        workout1, _ = Workout.objects.update_or_create(
            name='Morning Cardio',
            defaults={'description': 'Cardio workout for all levels'},
        )
        workout2, _ = Workout.objects.update_or_create(
            name='Strength Training',
            defaults={'description': 'Full body strength routine'},
        )
        workout1.suggested_for.set([user1, user3])
        workout2.suggested_for.set([user2])

        Leaderboard.objects.update_or_create(
            team=team1,
            defaults={'total_points': 100},
        )
        Leaderboard.objects.update_or_create(
            team=team2,
            defaults={'total_points': 80},
        )

        self.stdout.write(
            self.style.SUCCESS('Test data successfully populated in octofit_db')
        )
