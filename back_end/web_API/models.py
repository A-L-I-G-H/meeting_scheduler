from django.db import models
from django.contrib.auth.models import User

class event_polls(models.Model):
    creator = models.ForeignKey(User, on_delete = models.DO_NOTHING)
    is_finalized = models.BooleanField(default = False)
    title = models.CharField(max_length = 50)
    description = models.CharField(max_length = 250)

class options(models.Model):
    label = models.CharField(max_length = 100)
    event_poll = models.ForeignKey(event_polls, on_delete = models.CASCADE)

class votes(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    option = models.ForeignKey(options, on_delete = models.CASCADE)

class contributes(models.Model):
    event_poll = models.ForeignKey(event_polls, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.DO_NOTHING)