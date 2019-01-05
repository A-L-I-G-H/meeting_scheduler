from django.db import models
from django.contrib.auth.models import User
from web_API.models.Options import Options
from django.contrib import admin


class EventPolls(models.Model):
    creator = models.ForeignKey(User, on_delete = models.DO_NOTHING)
    finalized_option = models.ForeignKey(Options, on_delete= models.DO_NOTHING, null= True, blank= True)
    is_finalized = models.BooleanField(default = False)
    title = models.CharField(max_length = 50)
    description = models.CharField(max_length = 250)

    class Meta:
        db_table = 'EventPolls'
        app_label = 'web_API'


admin.site.register(EventPolls)
