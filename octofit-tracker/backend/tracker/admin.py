from django.contrib import admin
from .models import User, Team, Activity, Workout, Leaderboard


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
    filter_horizontal = ('members',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'duration', 'distance', 'date', 'team')
    list_filter = ('activity_type', 'date')
    search_fields = ('user__username', 'activity_type', 'team__name')


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name', 'description')
    filter_horizontal = ('suggested_for',)


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('team', 'total_points', 'last_updated')
    list_filter = ('last_updated',)
    search_fields = ('team__name',)
