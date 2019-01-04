from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models.EventPolls import EventPolls
from web_API.dataAccessLayer.Polls import Polls

class GetInvolvedPollsView(View):
    def post(self, request):
        request_body = get_request_body(request)
        involved_polls = Polls.get_involved_polls(request_body['username'])

        return JsonResponse({'polls': list(involved_polls)}, content_type="application/json")

