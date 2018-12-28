from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models import event_polls


class GetCreatedPollsView(View):
    def post(self, request):
        request_body = parse_request(request)
        owned_polls = event_polls.get_created_polls(request_body['username'])

        return JsonResponse({'data': list(owned_polls)}, content_type="application/json")

