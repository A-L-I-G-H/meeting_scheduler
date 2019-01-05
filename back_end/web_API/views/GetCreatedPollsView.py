from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models.EventPolls import EventPolls
from web_API.dataAccessLayer.Polls import Polls


class GetCreatedPollsView(View):
    def post(self, request):
        request_body = get_request_body(request)
        owned_polls = Polls.get_created_polls(request_body['username'])

        return JsonResponse(owned_polls, safe=False, content_type="application/json")

