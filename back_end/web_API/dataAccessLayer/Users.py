from django.contrib.auth.models import User
from web_API.models.Participates import Participates

class Users:

    @staticmethod
    def get_emails_of_users(usernames):
        emails_queryset = User.objects.filter(username__in= usernames).values_list("email", flat= True)
        email_list = []
        for email in emails_queryset:
            email_list.append(email)

        return email_list

    @staticmethod
    def join_meeting(meeting, usernames):
        users_queryset = User.objects.filter(username__in= usernames)
        for user in users_queryset:
            new_participation = Participates(meeting = meeting, user = user)
            new_participation.save()

