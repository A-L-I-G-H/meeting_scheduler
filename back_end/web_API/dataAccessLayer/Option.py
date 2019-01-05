from django.db import models
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options
from web_API.dataAccessLayer.Comment import Comment
import datetime

class Option():
    
    @staticmethod
    def get_options(poll_id):
        options_query_set = Options.objects.filter(event_poll_id = poll_id).values("id", "label", "date_time")
        options_list = list()
        for i in range(options_query_set.count()):
            comments = Comment.get_comments(options_query_set[i]['id'])
            option = options_query_set[i]
            option['comments'] = comments
            options_list.append(option)
        return options_list

    @staticmethod
    def get_light_weight_options(poll_id):
        return list(Options.objects.filter(event_poll_id = poll_id).values("id", "label", "date_time"))
