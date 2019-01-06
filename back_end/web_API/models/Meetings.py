from django.db import models
from django.contrib import admin
from web_API.models.Options import Options

class Meetings(models.Model):
    title = models.CharField(max_length = 50)
    startDate = models.DateTimeField(null= True, blank= True)
    endDate = models.DateTimeField(null= True, blank= True)
    label = models.CharField(max_length = 100)

    class Meta:
        db_table = 'Meetings'
        app_label = 'web_API'

admin.site.register(Meetings)