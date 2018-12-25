from flask import jsonify
from web_API.models import *
from django.core import serializers


class Polls:
    def get_polls_created_by_user(self, username):
        return event_polls.objects.filter(creator__username = username).values("title", "description", "is_finalized")


    def get_involved_polls(self, username):
        return contributes.objects.filter(user__username = username).values("event_poll").\
            values("event_poll__title", "event_poll__description", "event_poll__is_finalized")
