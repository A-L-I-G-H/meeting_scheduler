from django.test import TestCase
from web_API.dataAccessLayer.Comment import Comment
from django.contrib.auth.models import User
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options
from web_API.dataAccessLayer.Polls import Polls


class TestFinalizeAndReopen(TestCase):


    def setUp(self):
        self.new_user = User(username='test')
        self.new_user.save()
        self.new_poll = EventPolls(creator=self.new_user, title='test', description='test')
        self.new_poll.save()
        self.new_option = Options(event_poll=self.new_poll, label='test', startDate="2015-02-05T11:24:23Z"
                                  , endDate="2015-02-05T11:24:23Z")
        self.new_option.save()


    def test_finalize_poll(self):
        Polls.finalize(self.new_poll.id, self.new_option.id, self.new_user.username)
        self.assertEqual(EventPolls.objects.filter(id= self.new_poll.id).values("is_finalized")[0]['is_finalized'], True)


    def test_reopen_poll(self):
        Polls.finalize(self.new_poll.id, self.new_option.id, self.new_user.username)
        fields = {}
        fields['pollId'] = self.new_poll.id
        Polls.reopen_poll(fields)

        self.assertEqual(EventPolls.objects.filter(id= self.new_poll.id).values("is_finalized")[0]['is_finalized'], False)




    def tearDown(self):
        self.new_option.delete()
        self.new_poll.delete()
        self.new_user.delete()


