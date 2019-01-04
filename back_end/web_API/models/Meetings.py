from django.db import models
from django.contrib import admin

class Meetings(models.Model):
    date_time = models.DateTimeField(null= True, blank= True)

    class Meta:
        db_table = 'Meetings'
        app_label = 'web_API'

admin.site.register(Meetings)