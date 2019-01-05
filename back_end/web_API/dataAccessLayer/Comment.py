from django.db import models
from django.contrib.auth.models import User
from web_API.models.Comments import Comments
import datetime


class Comment():

    @staticmethod
    def get_comments(option_id):
        comments = Comments.objects.filter(option_id = option_id).values("id", "text", "user__username", "reply_id")
        return list(comments)