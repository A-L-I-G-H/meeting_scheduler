from django.http import HttpResponse
from django.views import View
from web_API.views.utilities import *

class VoteView(View):
    def post(self, request):
        request_body = get_request_body(request)

        return HttpResponse(status = 200, content_type="application/json")

