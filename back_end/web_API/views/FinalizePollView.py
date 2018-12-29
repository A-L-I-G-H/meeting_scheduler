from django.http import HttpResponse
from django.views import View
from web_API.views.utilities import *
from web_API.models.EventPolls import EventPolls


class FinalizePollView(View):
    def post(self, request):
        request_body = get_request_body(request)
        EventPolls.finalize(request_body['id'])

        return HttpResponse(status = 200, content_type="application/json")

