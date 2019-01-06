from web_API.models.Meetings import Meetings
from django.contrib.auth.models import User

class Meeting():

    @staticmethod
    def createMeeting(title, startDate, endDate, label):
        new_meeting = Meetings(title = title, startDate = startDate, endDate = endDate, label= label)
        new_meeting.save()
        return new_meeting

    
