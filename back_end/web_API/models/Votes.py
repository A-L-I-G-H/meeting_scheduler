from django.db import models
from django.contrib.auth.models import User
from web_API.models.Options import Options
from web_API.models.EventPolls import EventPolls


class Votes(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    option = models.ForeignKey('Options', on_delete = models.CASCADE)

    @staticmethod
    def vote(request_body):
        user = User.objects.filter(username=request_body['username'])[0]
        event_poll = EventPolls.objects.filter(id=request_body['event-id'])[0]
        option = Options.objects.filter(label=request_body['vote'], event_poll=event_poll)[0]
        vote = Votes(user=user, option=option)
        vote.save()


    class Meta:
        db_table = 'Votes'
        app_label = 'web_API'