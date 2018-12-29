from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models.EventPolls import EventPolls
import json


class GetPollView(View):
    def get(self, request):
        request_parameters = get_request_parameters(request)
        poll = EventPolls.get_poll(request_parameters['id'])

        return JsonResponse({'data': list(poll)}, content_type="application/json")