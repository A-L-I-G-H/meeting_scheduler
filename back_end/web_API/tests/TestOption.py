from django.test import TestCase
from web_API.dataAccessLayer.Option import Option
from web_API.models.Options import Options
from web_API.models.EventPolls import EventPolls
from django.contrib.auth.models import User

class TestComment(TestCase):
    new_user = User(username= 'test')
    new_poll = EventPolls(creator= new_user, title= 'test', description= 'test')
    new_option = Options(event_poll= new_poll, label= 'test', date_time= "2015-02-05T11:24:23Z")

    def setUp(self):
        self.new_user = User(username='test')
        self.new_user.save()
        self.new_poll = EventPolls(creator= self.new_user, title='test', description='test')
        self.new_poll.save()
        self.new_option = Options(event_poll=self.new_poll, label='test', date_time="2015-02-05T11:24:23Z")
        self.new_option.save()


    def test_get_options(self):
        options = Option.get_options(self.new_poll.id)
        self.assertEqual(options[0]['label'], 'test')


    def test_light_weight_options(self):
        options = Option.get_light_weight_options(self.new_option.id)
        self.assertEqual(options[0]['label'], 'test')


    def tearDown(self):
        self.new_option.delete()
        self.new_poll.delete()
        self.new_user.delete()
