from django.db import models
from web_API.models.EventPolls import EventPolls
from web_API.models.Options import Options
from web_API.dataAccessLayer.Comment import Comment
import datetime

class Option():
    
    @staticmethod
    def get_options(poll_id):
        options_query_set = Options.objects.filter(event_poll_id = poll_id).values("id", "label", "startDate", "endDate")
        options_list = list()
        for i in range(options_query_set.count()):
            comments = Comment.get_comments(options_query_set[i]['id'])
            option = options_query_set[i]
            option['comments'] = comments
            option['time'] = {'startDate': option['startDate'], 'endDate': option['endDate']}
            del option['startDate']
            del option['endDate']
            options_list.append(option)
        return options_list

    @staticmethod
    def get_light_weight_options(option_id):
        options_query_set = Options.objects.filter(id = option_id).values("id", "label", "startDate", "endDate")
        options_list = list()
        for i in range(options_query_set.count()):
            option = options_query_set[i]
            option['time'] = {'startDate': option['startDate'], 'endDate': option['endDate']}
            del option['startDate']
            del option['endDate']
            options_list.append(option)
        return options_list
