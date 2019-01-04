from django.db import models
from django.contrib import admin

class Options(models.Model):
    event_poll = models.ForeignKey('EventPolls', on_delete = models.CASCADE)
    label = models.CharField(max_length = 100)
    date = models.DateTimeField


    class Meta:
        db_table = 'Options'
        app_label = 'web_API'

admin.site.register(Options)