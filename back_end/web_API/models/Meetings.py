from django.db import models

class Meetings(models.Model):
    date = models.DateTimeField

    class Meta:
        db_table = 'Meetings'
        app_label = 'web_API'