from django.db import models
from django.contrib.auth.models import User
from web_API.models.Comments import Comments
from web_API.models.Options import Options
import datetime
from web_API.models.EventPolls import EventPolls


class Comment():

    @staticmethod
    def get_comments(option_id):
        comments = Comments.objects.filter(option_id = option_id).values("id", "text", "user__username", "reply_id")
        return list(comments)


    @staticmethod
    def add_comment(fields):
        comment = fields['comment']
        user = User.objects.filter(username= fields['username'])[0]
        option = Options.objects.filter(id= comment['commentedOnId'])[0]
        if(not comment['isReply'] ) :
            comment['repliedToId'] = None

        new_comment = Comments(user= user, option= option, text= comment['content'], reply_id= comment['repliedToId'])
        new_comment.save()

        return new_comment.id
