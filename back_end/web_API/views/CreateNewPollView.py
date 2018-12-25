from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import *


class CreateNewPollView(View):
    def post(self, request):
        request_body = parse_request(request)
        creator = request_body['username']
        
        return JsonResponse('hello')