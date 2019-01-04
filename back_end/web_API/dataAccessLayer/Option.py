from django.db import models
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options
import datetime

class Option():
    
    @staticmethod
    def get_options(poll_id):
        return Options.objects.filter(event_poll_id = poll_id).values("id", "label", "date_time")