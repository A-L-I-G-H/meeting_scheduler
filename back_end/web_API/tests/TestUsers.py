from django.test import TestCase
from web_API.dataAccessLayer.Users import Users
from django.contrib.auth.models import User

class TestUsers(TestCase):
    first_user = User(username= 'test 1', email= "test1@gmail.com")
    second_user = User(username= 'test 2', email= "test2@gmail.com")

    def setUp(self):
        self.first_user.save()
        self.second_user.save()


    def test_get_emails_of_users(self):
        self.assertEqual(Users.get_emails_of_users(['test 1', 'test 2']), ['test1@gmail.com', 'test2@gmail.com'])


    def tearDown(self):
        self.first_user.delete()
        self.second_user.delete()
