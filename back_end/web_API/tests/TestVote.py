



# not implemented yet


# from django.test import TestCase
# from web_API.dataAccessLayer.Vote import Vote
# from django.contrib.auth.models import User
# from web_API.models.EventPolls import EventPolls
# from web_API.models.Options import Options
# from web_API.models.ParticipantsVotes import ParticipantsVotes
# from web_API.dataAccessLayer.Polls import Polls
#
#
# class TestVote(TestCase):
#     request_body = {}
#
#     def setUp(self):
#         self.new_user = User(username='test user')
#         self.new_user.save()
#         self.request_body['username'] = 'test user'
#         request_body_poll = {}
#         request_body_poll['title'] = 'test title'
#         request_body_poll['description'] = 'test description'
#         request_body_poll['participants'] = ['test user']
#         request_body_poll['options'] = [{'label': 'test label', 'datetime': '2015-02-05T11:24:23Z'}]
#         self.request_body['poll'] = request_body_poll
#
#
#
#
#     def test_vote(self):
#         Polls.create_poll(self.request_body)
#         poll_id = EventPolls.objects.filter('')
#         vote_info = {'username': 'test user', 'pollId': }
#         Vote.vote()
#
#
#     def tearDown(self):
#         self.new_user.delete()