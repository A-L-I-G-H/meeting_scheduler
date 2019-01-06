from django.test import TestCase
from web_API.dataAccessLayer.Vote import Vote
from django.contrib.auth.models import User
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options
from web_API.models.ParticipantsVotes import ParticipantsVotes
from web_API.dataAccessLayer.Polls import Polls


class TestVote(TestCase):
    request_body = {}

    def setUp(self):
        self.new_user = User(username='test user')
        self.new_user.save()
        self.new_poll = EventPolls(creator=self.new_user, title='test', description='test')
        self.new_poll.save()
        self.new_option = Options(event_poll=self.new_poll, label='test', startDate="2015-02-05T11:24:23Z",
                                  endDate="2015-02-05T11:24:25Z")
        self.new_option.save()
        self.new_participants_vote = ParticipantsVotes(user= self.new_user, event_poll= self.new_poll,
                                                       option= self.new_option)
        self.new_participants_vote.save()




    def test_vote(self):
        vote_info = {'username': 'test user', 'pollId': self.new_poll.id, 'votes':[{"optionId": self.new_option.id,
                                                                                    "voteType": 2}]}
        Vote.vote(vote_info)
        self.assertEqual(ParticipantsVotes.objects.filter(user= self.new_user, option= self.new_option).
                         values_list('vote_type', flat= True)[0], 2)

    def tearDown(self):
        self.new_participants_vote.delete()
        self.new_option.delete()
        self.new_poll.delete()
        self.new_user.delete()
