from django.contrib.auth.models import User

class Users:

    @staticmethod
    def get_emails_of_users(usernames):
        emails_queryset = User.objects.filter(username__in= usernames).values_list("email", flat= True)
        email_list = []
        for email in emails_queryset:
            email_list.append(email)

        return email_list

