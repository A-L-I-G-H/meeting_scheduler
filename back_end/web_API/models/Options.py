from django.db import models



class Options(models.Model):
    label = models.CharField(max_length = 100)
    event_poll = models.ForeignKey('EventPolls', on_delete = models.CASCADE)

    class Meta:
        db_table = 'Options'
        app_label = 'web_API'