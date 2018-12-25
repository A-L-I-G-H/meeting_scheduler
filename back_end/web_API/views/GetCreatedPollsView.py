from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import *


class GetCreatedPollsView(View):
    def post(self, request):
        request_body = parse_request(request)
        user_polls = get_polls_created_by_user(request_body['username'])

        return JsonResponse({'polls': list(user_polls)}, content_type="application/json")

