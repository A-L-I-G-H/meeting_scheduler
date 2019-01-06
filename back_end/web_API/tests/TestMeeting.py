from django.test import TestCase
from web_API.dataAccessLayer.Meeting import Meeting


class TestMeeting(TestCase):

    def test_create_meeting(self):
        meeting = Meeting.createMeeting('title', startDate="2015-02-05T11:24:23Z", endDate="2015-02-05T11:24:23Z", label= 'label')
        self.assertEqual(meeting.label, 'label')
        meeting.delete()