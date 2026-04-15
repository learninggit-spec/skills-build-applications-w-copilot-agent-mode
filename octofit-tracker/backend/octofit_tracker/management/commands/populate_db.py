from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate octofit_db with test data'

    def handle(self, *args, **kwargs):
        # Create Users
        user1 = User.objects.create(username='alice', email='alice@example.com', first_name='Alice', last_name='Smith')
        user2 = User.objects.create(username='bob', email='bob@example.com', first_name='Bob', last_name='Jones')
        user3 = User.objects.create(username='carol', email='carol@example.com', first_name='Carol', last_name='Lee')

        # Create Teams
        team1 = Team.objects.create(name='Team Alpha')
        team2 = Team.objects.create(name='Team Beta')
        team1.members.set([user1, user2])
        team2.members.set([user3])

        # Create Activities
        Activity.objects.create(user=user1, activity_type='run', duration=30, distance=5.0, date=timezone.now().date(), team=team1)
        Activity.objects.create(user=user2, activity_type='cycle', duration=45, distance=20.0, date=timezone.now().date(), team=team1)
        Activity.objects.create(user=user3, activity_type='swim', duration=60, distance=2.0, date=timezone.now().date(), team=team2)

        # Create Workouts
        workout1 = Workout.objects.create(name='Morning Cardio', description='Cardio workout for all levels')
        workout2 = Workout.objects.create(name='Strength Training', description='Full body strength routine')
        workout1.suggested_for.set([user1, user3])
        workout2.suggested_for.set([user2])

        # Create Leaderboards
        Leaderboard.objects.create(team=team1, total_points=100)
        Leaderboard.objects.create(team=team2, total_points=80)

        self.stdout.write(self.style.SUCCESS('Test data successfully populated in octofit_db'))
