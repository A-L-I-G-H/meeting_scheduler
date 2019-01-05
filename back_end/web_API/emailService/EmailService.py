import threading
from django.core.mail import send_mail
from web_API.dataAccessLayer.Users import Users

sender_mail = "meetingschedulerforyou@gmail.com"

class EmailServiceThread(threading.Thread):
    def __init__(self, subject, content, recipient_list):
        self.subject = subject
        self.recipient_list = recipient_list
        self.content = content
        threading.Thread.__init__(self)

    def run (self):
        send_mail(self.subject, self.content, sender_mail, self.recipient_list)


def send_email_to_users(subject, content, recipient_list):
    EmailServiceThread(subject, content, recipient_list).start()

def send_email_to_these_usernames(subject, body, usernames):
    email_list = Users.get_emails_of_users(usernames)
    send_email_to_users(subject, body, email_list)