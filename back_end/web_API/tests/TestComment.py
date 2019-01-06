from django.test import TestCase
from web_API.dataAccessLayer.Comment import Comment

class TestComment(TestCase):
    fields = {}

    def setUp(self):
        comment = {}
        comment['commentedOnId'] = 1
        comment['isReply'] = False
        comment['repliedToId'] = 1
        comment['content'] = 'hi'

        self.fields['username'] = 'ali'
        self.fields['comment'] = comment


    def test_add_comment(self):
        id = Comment.add_comment(self.fields)
        comments = Comment.get_comments(1)
        comment = [c for c in comments if c['id'] == id]
        self.assertEqual(comment[0]['text'], 'hi')

