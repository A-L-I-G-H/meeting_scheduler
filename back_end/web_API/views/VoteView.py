from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Vote import Vote

class VoteView(View):
    def post(self, request):
        request_body = get_request_body(request)
        result =Vote.vote(request_body)

        return JsonResponse(result, content_type="application/json")

