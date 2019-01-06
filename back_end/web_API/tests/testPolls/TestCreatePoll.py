from django.test import TestCase
from web_API.dataAccessLayer.Comment import Comment
from django.contrib.auth.models import User
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options
from web_API.models.ParticipantsVotes import ParticipantsVotes
from web_API.dataAccessLayer.Polls import Polls


class TestCreatePoll(TestCase):
    request_body = {}

    def setUp(self):
        self.new_user = User(username='test user')
        self.new_user.save()
        self.request_body['username'] = 'test user'
        request_body_poll = {}
        request_body_poll['title'] = 'test title'
        request_body_poll['description'] = 'test description'
        request_body_poll['participants'] = ['test user']
        request_body_poll['options'] = [{'label':'test label', 'time': { 'startDate': '2019-02-13T12:00:00Z',
            'endDate': '2019-02-13T12:10:00Z'}}]
        request_body_poll['isPeriodic']= True
        request_body_poll['periodDays']= 7
        request_body_poll['startDate']= '2019-01-10T12:00:00Z'
        request_body_poll['endDate']= '2019-01-10T12:00:02Z'
        self.request_body['poll'] = request_body_poll




    def test_create_poll(self):
        Polls.create_poll(self.request_body)

        self.assertEqual(EventPolls.objects.filter(creator__username= 'test user').values_list('title', flat= True)[0],
                         'test title')

        self.assertEqual(Options.objects.filter(event_poll__creator__username= 'test user').values_list('label', flat= True)[0],
                         'test label')


    def tearDown(self):
        self.new_user.delete()