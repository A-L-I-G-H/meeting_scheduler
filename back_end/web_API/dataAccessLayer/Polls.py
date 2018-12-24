from flask import jsonify
from web_API.models import *
from django.core import serializers


class Polls:
    def get_polls_created_by_user(username):
        return event_polls.objects.filter(creator__username = username).values("title", "description", "is_finalized")


