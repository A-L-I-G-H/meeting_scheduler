from django.db import models



class Options(models.Model):
    event_poll = models.ForeignKey('EventPolls', on_delete = models.CASCADE)
    label = models.CharField(max_length = 100)
    date = models.DateTimeField


    class Meta:
        db_table = 'Options'
        app_label = 'web_API'