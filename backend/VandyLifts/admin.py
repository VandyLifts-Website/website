from django.contrib import admin
from .models import Organization, SurveySubmission, Match


# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')


class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'names')


class SurveySubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'is_mentor', 'organization')


class MatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'names')


# Register your models here.
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(SurveySubmission, SurveySubmissionAdmin)
admin.site.register(Match, MatchAdmin)
