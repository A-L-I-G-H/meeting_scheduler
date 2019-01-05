from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin


class ParticipantsVotes(models.Model):
    YES = 1
    NO = 0
    ONLY_IF_NECCESSARY = 2
    VOTE_TYPE_CHOICES = (
        (YES, 'Yes'),
        (NO, 'No'),
        (ONLY_IF_NECCESSARY, 'Only_if_neccessary')
    )

    event_poll = models.ForeignKey('EventPolls', on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    option = models.ForeignKey('Options', on_delete= models.CASCADE)
    vote_type = models.IntegerField(
        choices= VOTE_TYPE_CHOICES,
        default= NO,
    )

    class Meta:
        db_table = 'ParticipantsVotes'
        app_label = 'web_API'


admin.site.register(ParticipantsVotes)