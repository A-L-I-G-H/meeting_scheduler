from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import Polls

class ReopenView(View):
    def post(self, request):
        request_body = get_request_body(request)
        result = Polls.reopen_poll(request_body)

        return JsonResponse(result, content_type="application/json")

