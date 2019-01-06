from django.test import TestCase
from web_API.dataAccessLayer.Comment import Comment
from django.contrib.auth.models import User
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options

class TestComment(TestCase):
    fields = {}
    new_user = User(username='test')
    new_poll = EventPolls(creator= new_user, title='test', description='test')
    new_option = Options(event_poll= new_poll, label='test', startDate="2015-02-05T11:24:23Z",
                         endDate="2015-02-05T11:24:25Z")

    def setUp(self):
        self.new_user = User(username='test')
        self.new_user.save()
        self.new_poll = EventPolls(creator=self.new_user, title='test', description='test')
        self.new_poll.save()
        self.new_option = Options(event_poll=self.new_poll, label='test', startDate="2015-02-05T11:24:23Z",
                                  endDate="2015-02-05T11:24:25Z")
        self.new_option.save()

        comment = {}
        comment['commentedOnId'] = self.new_option.id
        comment['isReply'] = False
        comment['repliedToId'] = None
        comment['content'] = 'hi'

        self.fields['username'] = 'ali'
        self.fields['comment'] = comment


    def test_add_comment(self):
        id = Comment.add_comment(self.fields)
        comments = Comment.get_comments(self.new_option)
        comment = [c for c in comments if c['id'] == id]
        self.assertEqual(comment[0]['text'], 'hi')

    def tearDown(self):
        self.new_option.delete()
        self.new_poll.delete()
        self.new_user.delete()