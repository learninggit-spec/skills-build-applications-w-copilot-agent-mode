from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard


class ObjectIdRelatedField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return str(getattr(value, 'pk', value))


class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    members = ObjectIdRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Team
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = ObjectIdRelatedField(queryset=User.objects.all())
    team = ObjectIdRelatedField(queryset=Team.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Activity
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    suggested_for = ObjectIdRelatedField(many=True, queryset=User.objects.all(), required=False)

    class Meta:
        model = Workout
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    team = ObjectIdRelatedField(queryset=Team.objects.all())

    class Meta:
        model = Leaderboard
        fields = '__all__'