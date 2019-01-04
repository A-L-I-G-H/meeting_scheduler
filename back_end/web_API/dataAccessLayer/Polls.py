from web_API.models.EventPolls import EventPolls
from web_API.models.ParticipantsVotes import ParticipantsVotes
from web_API.emailService import EmailService
from django.contrib.auth.models import User
from web_API.models.Options import Options
from django.db import models


class Polls():

    @staticmethod
    def get_poll(id):
        return EventPolls.objects.filter(id= id).values("id", "title", "description", "is_finalized")

    @staticmethod
    def get_created_polls(username):
        return EventPolls.objects.filter(creator__username= username).values("id", "title", "description",
                                                                            "is_finalized")

    @staticmethod
    def get_involved_polls(username):
        return ParticipantsVotes.objects.filter(user__username=username).values("event_poll__id", "event_poll__title",
                                                                                "event_poll__description",
                                                                                "event_poll__is_finalized").distinct()

    @staticmethod
    def create_poll(request_body):
        user = User.objects.filter(username = request_body['username'])[0]

        new_poll = EventPolls(creator = user, is_finalized= False, title= request_body['title'], description= request_body['description'])
        new_poll.save()

        EmailService.send_email_to_these_usernames('new', 'new', request_body['participants'])

        Polls.create_options(new_poll, request_body['options'], request_body['participants'])


    @staticmethod
    def create_options(event_poll, options, participants):
        for option in options:
            new_option = Options(label= option["label"], date_time= option["date-time"], event_poll= event_poll)

            new_option.save()
            Polls.create_participants_votes(event_poll, option, participants)


    @staticmethod
    def create_participants_votes(event_poll, option, participants_usernames):
        for participant_username in participants_usernames:
            participant = User.objects.filter(username = participant_username)[0]
            new_participants_vote = ParticipantsVotes(event_poll= event_poll, user= participant, option= option)
            new_participants_vote.save()

    # @staticmethod
    # def finalize(id):
    #     poll = EventPolls.objects.filter(id= id)[0]
    #     poll.is_finalized = True
    #     poll.save()
    #
    #     email_list = EventPolls.get_contributors_emails(poll)
    #     send_email_to_users('fin', 'fin', email_list)

    # def get_contributors_emails(poll):
    #     email_query_set = Contributes.objects.filter(event_poll=poll).values("user").values("user__email")
    #     email_list = []
    #     for email in email_query_set:
    #         email_list.append(email['user__email'])
    #
    #     return email_list