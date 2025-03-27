from django.contrib import admin

# Register your models here.

from .models import *

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'ranking', 'details_url')
    search_fields = ('name', 'country')
    list_filter = ('country',)
    ordering = ('-ranking',)

@admin.register(WhyChoose)
class WhyChooseAdmin(admin.ModelAdmin):
    list_display = ('university', 'title', 'text')
    search_fields = ('university__name', 'text')

@admin.register(ExtraParagraph)
class ExtraParagraphAdmin(admin.ModelAdmin):
    list_display = ('university', 'text')
    search_fields = ('university__name', 'text')

@admin.register(ShortInfo)
class ShortInfoAdmin(admin.ModelAdmin):
    list_display = ('university', 'name', 'color', 'priority')
    search_fields = ('university__name', 'name')
    list_filter = ('priority',)
    ordering = ('priority',)

admin.site.register(Country)