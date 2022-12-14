# Generated by Django 4.1.1 on 2023-01-09 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VandyLifts', '0003_surveysubmission_anything_else_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='matched_mentees_weight',
            field=models.PositiveIntegerField(default=10),
        ),
        migrations.AddField(
            model_name='organization',
            name='matched_mentors_weight',
            field=models.PositiveIntegerField(default=10),
        ),
        migrations.AddField(
            model_name='organization',
            name='matched_preferences_weight',
            field=models.PositiveIntegerField(default=2),
        ),
        migrations.AlterField(
            model_name='organization',
            name='num_matches_weight',
            field=models.PositiveIntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='organization',
            name='num_time_matches_weight',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
