from django.test import TestCase
from web_API.dataAccessLayer.Comment import Comment
from django.contrib.auth.models import User
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options
from web_API.models.ParticipantsVotes import ParticipantsVotes
from web_API.dataAccessLayer.Polls import Polls


class TestGetPolls(TestCase):


    def setUp(self):
        self.new_user = User(username='test')
        self.new_user.save()
        self.new_poll = EventPolls(creator=self.new_user, title='test', description='test')
        self.new_poll.save()
        self.new_option = Options(event_poll=self.new_poll, label='test', date_time="2015-02-05T11:24:23Z")
        self.new_option.save()
        self.new_participants_vote = ParticipantsVotes(user= self.new_user, event_poll= self.new_poll,
                                                       option= self.new_option)
        self.new_participants_vote.save()


    def test_get_poll(self):
        poll = Polls.get_poll(self.new_poll.id)
        self.assertEqual(poll['title'], 'test')
        self.assertEqual(poll['options'][0]['label'], 'test')


    def test_get_created_polls(self):
        polls = Polls.get_created_polls('test')
        self.assertEqual(polls[0]['title'], 'test')


    def test_get_involved_polls(self):
        polls = Polls.get_involved_polls('test')
        self.assertEqual(polls[0]['event_poll__title'], 'test')


    def tearDown(self):
        self.new_option.delete()
        self.new_poll.delete()
        self.new_user.delete()
        self.new_participants_vote.delete()


