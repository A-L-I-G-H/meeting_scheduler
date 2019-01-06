from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import Polls


class CollisionView(View):
    def post(self, request):
        # request_body = get_request_body(request)
        # result = Polls.finalize(request_body['pollId'], request_body['finalizeOptionId'], request_body['username'])

        return JsonResponse({'ok':True}, content_type="application/json")