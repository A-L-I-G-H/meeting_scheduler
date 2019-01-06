from web_API.models.EventPolls import EventPolls
from web_API.models.ParticipantsVotes import ParticipantsVotes
from web_API.models.PeriodicEventPolls import PeriodicEventPolls
from web_API.emailService import EmailService
from django.contrib.auth.models import User
from web_API.models.Options import Options
from web_API.dataAccessLayer.Option import Option


class Polls():

    @staticmethod
    def reopen_poll(fields):
        poll = EventPolls.objects.filter(id=fields['pollId'])[0]
        poll.is_finalized = False
        poll.save()

        email_list = ParticipantsVotes.objects.filter(event_poll=poll).values_list("user__email", flat=True)
        EmailService.send_email_to_users("reopened", "reopened", email_list)

        return {"ok": True}

    @staticmethod
    def get_poll(id):
        poll = EventPolls.objects.filter(id= id).values("id", "title", "description", "is_finalized", 'creator__username', "finalized_option_id")[0]
        options = Option.get_options(id)
        poll['options'] = options
        participants_list = list(ParticipantsVotes.objects.filter(event_poll = id).values_list("user__username", flat = True).distinct())
        poll['participants'] = participants_list
        print(type(id))
        poll['participants']=Polls.get_participants(id)
        periodic = Polls.is_meeting_periodic(id)
        print(type(periodic))
        print(periodic)
        if periodic == None:
            poll['isPeriodic'] = False
            poll['periodDays'] = None
            poll['startDate'] = None
            poll['endDate'] = None
        else:
            poll['isPeriodic'] = True
            poll['periodDays'] = periodic[2]
            poll['startDate'] = periodic[0]
            poll['endDate'] = periodic[1]
        return poll

    @staticmethod
    def get_participants(poll_id):
        participants_list = list(ParticipantsVotes.objects.filter(event_poll = poll_id).values_list("user__username", "voted", "option", "vote_type").order_by('user__username'))
        result_list = list()
        Participant_struct = {'username': None}
        user_votes_list = list()
        for participant_vote in participants_list:
            if Participant_struct['username'] != participant_vote[0]:
                result_list.append(Participant_struct)
                del user_votes_list[:]
            Participant_struct['username'] = participant_vote[0]
            Participant_struct['voted'] = participant_vote[1]
            vote_option_dict = {'optionId': participant_vote[2], 'voteType':participant_vote[3]}
            user_votes_list.append(vote_option_dict)
            Participant_struct['votes'] = user_votes_list
        return result_list

    @staticmethod
    def is_meeting_periodic(poll_id):
        result_poll = None
        if PeriodicEventPolls.objects.filter(event_poll_id = poll_id).exists():
            result_poll = PeriodicEventPolls.objects.filter(event_poll_id = poll_id).values_list('start_date', 'end_date', 'period')[0]
        return result_poll

    @staticmethod
    def get_created_polls(username):
        owned_polls_query_set = EventPolls.objects.filter(creator__username= username).values("id", "title", "description",
                                                                            "is_finalized", "finalized_option_id")
        polls_list = list()
        for i in range(owned_polls_query_set.count()):
            if owned_polls_query_set[i]['is_finalized'] == True:
                finalized_option = Option.get_light_weight_options(owned_polls_query_set[i]['finalized_option_id'])
                poll = owned_polls_query_set[i]
                poll['finalizedOption'] = finalized_option
                del poll['finalized_option_id']
                polls_list.append(poll)
            else:
                poll = owned_polls_query_set[i]
                poll['finalizedOption'] = None
                del poll['finalized_option_id']
                polls_list.append(poll)

        return polls_list

    @staticmethod
    def get_involved_polls(username):
        participated_polls_query_set = ParticipantsVotes.objects.filter(user__username=username).values("event_poll__id", "event_poll__title",
                                                                                "event_poll__description",
                                                                                "event_poll__is_finalized", "event_poll__finalized_option_id").distinct()
        polls_list = list()
        for i in range(participated_polls_query_set.count()):
            if participated_polls_query_set[i]['event_poll__is_finalized'] == True:
                finalized_option = Option.get_light_weight_options(participated_polls_query_set[i]['event_poll__finalized_option_id'])
                print(participated_polls_query_set[i]['event_poll__finalized_option_id'])
                print(finalized_option)
                poll = participated_polls_query_set[i]
                poll['finalizedOption'] = finalized_option
                del poll['event_poll__finalized_option_id']
                polls_list.append(poll)
            else:
                poll = participated_polls_query_set[i]
                poll['finalizedOption'] = None
                del poll['event_poll__finalized_option_id']
                polls_list.append(poll)

        return polls_list

    @staticmethod
    def create_poll(request_body):
        user = User.objects.filter(username = request_body['username'])[0]

        new_poll = EventPolls(creator = user, is_finalized= False, title= request_body['poll']['title'], description= request_body['poll']['description'])
        new_poll.save()

        EmailService.send_email_to_these_usernames('new', 'new', request_body['poll']['participants'])

        Polls.create_options(new_poll, request_body['poll']['options'], request_body['poll']['participants'])
        return {"ok":True}


    @staticmethod
    def create_options(event_poll, options, participants):
        for option in options:
            new_option = Options(label= option["label"], date_time= option["datetime"], event_poll= event_poll)

            new_option.save()
            Polls.create_participants_votes(event_poll, new_option, participants)


    @staticmethod
    def create_participants_votes(event_poll, option, participants_usernames):
        for participant_username in participants_usernames:
            participant = User.objects.filter(username = participant_username)[0]
            new_participants_vote = ParticipantsVotes(event_poll= event_poll, user= participant, option= option)
            new_participants_vote.save()

    @staticmethod
    def finalize(poll_id, option_id, username):
        poll = EventPolls.objects.filter(id = poll_id)[0]
        poll.is_finalized = True
        poll.finalized_option = Options.objects.filter(id = option_id)[0]
        poll.save()

        email_list = ParticipantsVotes.objects.filter(event_poll = poll).values_list("user__email", flat = True)
        print(email_list)
        EmailService.send_email_to_users('fin', 'fin', email_list)
        return {"ok":True}
