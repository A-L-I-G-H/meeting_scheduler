from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import Polls


class GetPollView(View):
    def get(self, request):
        request_parameters = get_request_parameters(request)
        poll = Polls.get_poll(request_parameters['id'])
        return JsonResponse(poll, content_type="application/json")