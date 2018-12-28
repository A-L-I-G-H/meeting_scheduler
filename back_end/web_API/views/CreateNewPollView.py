from django.http import HttpResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models import event_polls

class CreateNewPollView(View):
    def post(self, request):
        request_body = parse_request(request)
        email_list = event_polls.create_poll(request_body)
        return HttpResponse(status = 200, content_type="application/json")

