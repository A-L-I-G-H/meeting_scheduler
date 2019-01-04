from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin


class ParticipantsVotes(models.Model):
    YES = 'Y'
    NO = 'N'
    ONLY_IF_NECCESSARY = 'O'
    VOTE_TYPE_CHOICES = (
        (YES, 'Yes'),
        (NO, 'No'),
        (ONLY_IF_NECCESSARY, 'Only_if_neccessary')
    )

    event_poll = models.ForeignKey('EventPolls', on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    option = models.ForeignKey('Options', on_delete= models.CASCADE)
    vote_type = models.CharField(
        max_length= 1,
        choices= VOTE_TYPE_CHOICES,
        default= NO,
    )

    class Meta:
        db_table = 'ParticipantsVotes'
        app_label = 'web_API'


admin.site.register(ParticipantsVotes)