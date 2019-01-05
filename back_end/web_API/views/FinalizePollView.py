from django.http import HttpResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import Polls


class FinalizePollView(View):
    def put(self, request):
        request_body = get_request_body(request)
        Polls.finalize(request_body['pollId'], request_body['finalizeOptionId'], request_body['username'])

        return HttpResponse(status = 200, content_type="application/json")