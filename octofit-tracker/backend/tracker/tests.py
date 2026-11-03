from django.test import TestCase
from django.urls import reverse
from .models import User, Team, Activity, Workout, Leaderboard
from .serializers import TeamSerializer, UserSerializer

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(username='testuser2', email='test2@example.com')
        activity = Activity.objects.create(user=user, activity_type='run', duration=30, date='2026-04-15')
        self.assertEqual(activity.activity_type, 'run')

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Pushups')
        self.assertEqual(workout.name, 'Pushups')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name='Leaderboard Team')
        leaderboard = Leaderboard.objects.create(team=team)
        self.assertEqual(leaderboard.team.name, 'Leaderboard Team')

class ObjectIdSerializerTest(TestCase):
    def test_serializes_object_ids_as_strings(self):
        user = User.objects.create(username='objectiduser', email='objectid@example.com')
        team = Team.objects.create(name='ObjectId Team')

        self.assertIsInstance(UserSerializer(user).data['id'], str)
        team_data = TeamSerializer(team).data
        self.assertIsInstance(team_data['id'], str)
        members_field = TeamSerializer().fields['members']
        self.assertEqual(
            members_field.child_relation.to_representation(user),
            str(user.pk),
        )

class ApiRouteTest(TestCase):
    def test_root_returns_api_root(self):
        response = self.client.get(reverse('api-home'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['users'], '/api/users/')

    def test_api_root_and_collection_endpoint(self):
        root_response = self.client.get(reverse('api-root'))
        users_response = self.client.get('/api/users/')

        self.assertEqual(root_response.status_code, 200)
        self.assertEqual(users_response.status_code, 200)
        self.assertEqual(users_response.json(), [])

# Create your tests here.
