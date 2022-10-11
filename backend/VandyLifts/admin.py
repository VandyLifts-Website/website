from django.contrib import admin
from .models import Organization, SurveySubmission, Match, TimeAvailability


# Register your models here.
class TimeAvailabilityAdmin(admin.ModelAdmin):
    list_display = [field.name for field in TimeAvailability._meta.fields]


class OrganizationAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Organization._meta.fields]


class SurveySubmissionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in SurveySubmission._meta.fields]


class MatchAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Match._meta.fields]


# Register your models here.
admin.site.register(TimeAvailability, TimeAvailabilityAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(SurveySubmission, SurveySubmissionAdmin)
admin.site.register(Match, MatchAdmin)
