# Generated by Django 4.1.1 on 2022-12-02 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VandyLifts', '0002_add_default_times'),
    ]

    operations = [
        migrations.AddField(
            model_name='surveysubmission',
            name='anything_else',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='changing_mentors',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='else_involved',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='general_lifting',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='hours_per_week',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='interests',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='prior_experience',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='questions',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='want_partner_of_same_experience',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='surveysubmission',
            name='why_interested_in_buddy',
            field=models.TextField(blank=True),
        ),
    ]
