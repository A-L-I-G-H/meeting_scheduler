from django.db import models
from django.contrib import admin
# from web_API.models.EventPolls import EventPolls


class PeriodicEventPolls(models.Model):
    event_poll = models.ForeignKey('EventPolls', on_delete= models.CASCADE)
    start_date = models.DateTimeField(null=False)
    end_date = models.DateTimeField(null=False)
    period = models.IntegerField(null=False)



    class Meta:
        db_table = 'PeriodicEventPolls'
        app_label = 'web_API'


admin.site.register(PeriodicEventPolls)