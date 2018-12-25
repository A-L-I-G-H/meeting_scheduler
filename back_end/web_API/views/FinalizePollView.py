from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import *


class FinalizePollView(View):
    def post(self, request, poll_id):
        request_body = parse_request(request)
        creator = request_body['username']
        #TODO
        return JsonResponse('hello')