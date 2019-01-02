from django.db import models
from web_API.models.EventPolls import EventPolls


class PeriodicEventPolls(models.Model):
    event_poll = models.ForeignKey(EventPolls, on_delete= models.CASCADE)
    start_date = models.DateTimeField
    end_date = models.DateTimeField
    period = models.IntegerField