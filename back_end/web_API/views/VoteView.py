from django.http import HttpResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import *


class VoteView(View):
    def post(self, request):
        request_body = parse_request(request)
        vote(request_body)

        return HttpResponse(status = 200, content_type="application/json")

