from django.contrib import admin

# Register your models here.

from .models import Education, Experience, Profile, Project

admin.site.register(Profile)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Project)