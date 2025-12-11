from django.core.management.base import BaseCommand

from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, LeaderboardEntry, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        User = get_user_model()
        # Delete all users with a valid PK only, to avoid unhashable errors
        User.objects.exclude(pk=None).delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        ironman = User.objects.create(username='ironman', email='ironman@marvel.com', first_name='Tony', last_name='Stark')
        captain = User.objects.create(username='cap', email='cap@marvel.com', first_name='Steve', last_name='Rogers')
        batman = User.objects.create(username='batman', email='batman@dc.com', first_name='Bruce', last_name='Wayne')
        superman = User.objects.create(username='superman', email='superman@dc.com', first_name='Clark', last_name='Kent')
        marvel.members.add(ironman, captain)
        dc.members.add(batman, superman)

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        from datetime import date
        Activity.objects.create(user=ironman, activity_type='Run', duration=30, calories_burned=300, date=date.today())
        Activity.objects.create(user=captain, activity_type='Swim', duration=45, calories_burned=400, date=date.today())
        Activity.objects.create(user=batman, activity_type='Cycle', duration=60, calories_burned=500, date=date.today())
        Activity.objects.create(user=superman, activity_type='Yoga', duration=50, calories_burned=200, date=date.today())

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes', suggested_for='All')
        Workout.objects.create(name='Strength Training', description='Strength for DC', suggested_for='Team DC')
        Workout.objects.create(name='Agility Drills', description='Agility for Marvel', suggested_for='Team Marvel')

        self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
        LeaderboardEntry.objects.create(user=superman, score=1100, rank=1)
        LeaderboardEntry.objects.create(user=ironman, score=1000, rank=2)
        LeaderboardEntry.objects.create(user=batman, score=950, rank=3)
        LeaderboardEntry.objects.create(user=captain, score=900, rank=4)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
