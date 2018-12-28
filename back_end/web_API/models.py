from django.db import models
from django.contrib.auth.models import User
from web_API.emailService.EmailService import *


class event_polls(models.Model):
    creator = models.ForeignKey(User, on_delete = models.DO_NOTHING)
    is_finalized = models.BooleanField(default = False)
    title = models.CharField(max_length = 50)
    description = models.CharField(max_length = 250)

    @staticmethod
    def get_created_polls(username):
        return event_polls.objects.filter(creator__username = username).values("id", "title", "description",
                                                                               "is_finalized")

    @staticmethod
    def get_involved_polls(username):
        return contributes.objects.filter(user__username=username).values("event_poll"). \
            values("id", "event_poll__title", "event_poll__description", "event_poll__is_finalized")

    @staticmethod
    def create_poll(request_body):
        user = User.objects.filter(username = request_body['username'])[0]

        new_poll = event_polls(creator = user, is_finalized= False, title= request_body['title'], description= request_body['description'])
        new_poll.save()
        for option in request_body['options']:
            new_option = options(label= option, event_poll= new_poll)
            new_option.save()

        email_list = []

        for contributor in request_body['contributors']:
            contrib = User.objects.filter(username = contributor)[0]
            new_contributes = contributes(event_poll= new_poll, user= contrib)
            new_contributes.save()
            email_list.append(contrib.email)

        send_email_to_users('new', 'new', email_list)


    @staticmethod
    def finalize(id):
        poll = event_polls.objects.filter(id= id)[0]
        poll.is_finalized = True
        poll.save()

        email_list = event_polls.get_contributors_emails(poll)
        send_email_to_users('fin', 'fin', email_list)


    @staticmethod
    def get_contributors_emails(poll):
        email_query_set = contributes.objects.filter(event_poll= poll).values("user").values("user__email")
        email_list = []
        for email in email_query_set:
            email_list.append(email['user__email'])

        return email_list


class options(models.Model):
    label = models.CharField(max_length = 100)
    event_poll = models.ForeignKey(event_polls, on_delete = models.CASCADE)


class votes(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    option = models.ForeignKey(options, on_delete = models.CASCADE)

    @staticmethod
    def vote(request_body):
        user = User.objects.filter(username=request_body['username'])[0]
        event_poll = event_polls.objects.filter(id=request_body['event-id'])[0]
        option = options.objects.filter(label=request_body['vote'], event_poll=event_poll)[0]
        vote = votes(user=user, option=option)
        vote.save()



class contributes(models.Model):
    event_poll = models.ForeignKey(event_polls, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.DO_NOTHING)