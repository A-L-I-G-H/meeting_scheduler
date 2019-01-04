from django.db import models
from django.contrib.auth.models import User
from web_API.models.Meetings import *
from django.contrib import admin


class Participates(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    meeting = models.ForeignKey(Meetings, on_delete= models.CASCADE)

    class Meta:
        db_table = 'Participates'
        app_label = 'web_API'


admin.site.register(Participates)