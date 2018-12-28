from django.db import models
from django.contrib.auth.models import User

class Contributes(models.Model):
    event_poll = models.ForeignKey('EventPolls', on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.DO_NOTHING)

    class Meta:
        db_table = 'Contributes'
        app_label = 'web_API'