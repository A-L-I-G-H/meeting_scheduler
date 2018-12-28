from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models.EventPolls import EventPolls

class GetInvolvedPollsView(View):
    def post(self, request):
        request_body = parse_request(request)
        involved_polls = EventPolls.get_involved_polls(request_body['username'])

        return JsonResponse({'polls': list(involved_polls)}, content_type="application/json")

