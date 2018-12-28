from django.http import HttpResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models.EventPolls import EventPolls

class CreateNewPollView(View):
    def post(self, request):
        request_body = parse_request(request)
        email_list = EventPolls.create_poll(request_body)
        return HttpResponse(status = 200, content_type="application/json")

