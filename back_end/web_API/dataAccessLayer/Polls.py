from web_API.models import *
from django.contrib.auth.models import User
from web_API.emailService.EmailService import *
import asyncio


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
        new_option = options(label= option, event_poll= new_poll)
        new_option.save()

    email_list = []

    for contributor in request_body['contributors']:
        contrib = User.objects.filter(username = contributor)[0]
        new_contributes = contributes(event_poll= new_poll, user= contrib)
        new_contributes.save()
        email_list.append(contrib.email)

    send_email_to_users('new', 'new', email_list)




def finalize_poll(request_body):
    event_poll = event_polls.objects.all()[0]
    event_poll.is_finalized = True
    event_poll.save()

    email_list = get_contributors_emails(event_poll)
    send_email_to_users('fin', 'fin', email_list)


def get_contributors_emails(event_poll):
    email_query_set = contributes.objects.filter(event_poll=event_poll).values("user").values("user__email")
    email_list = []
    for email in email_query_set:
        email_list.append(email['user__email'])

    return email_list
