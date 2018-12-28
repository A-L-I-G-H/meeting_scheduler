from django.test import TestCase
from web_API.emailService.EmailService import *

class EmailServiceTest(TestCase):

    def test_email_sending(self):
        send_email_to_users('test subject', 'test body', ['aligharizadeh@outlook.com'])
