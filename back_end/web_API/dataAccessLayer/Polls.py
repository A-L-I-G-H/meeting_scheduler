from web_API.models import *
from django.contrib.auth.models import User


class Polls:
    def get_polls_created_by_user(username):
        return event_polls.objects.filter(creator__username = username).values("title", "description", "is_finalized")


    def get_involved_polls(username):
        return contributes.objects.filter(user__username = username).values("event_poll").\
            values("event_poll__title", "event_poll__description", "event_poll__is_finalized")


    def create_poll(request_body):
        user = User.objects.filter(username = request_body['username'])[0]

        new_poll = event_polls(creator = user, is_finalized= False, title= request_body['title'], description= request_body['description'])
        new_poll.save()
        for option in request_body['options']:
            print(option)
            new_option = options(label= option, event_poll= new_poll)
            new_option.save()

        for contributor in request_body['contributors']:
            contrib = User.objects.filter(username = contributor)[0]
            new_contributes = contributes(event_poll= new_poll, user= contrib)
            new_contributes.save()

    def finalize_poll:
