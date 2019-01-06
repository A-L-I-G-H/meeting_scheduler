from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Polls import Polls


class CollisionView(View):
    def post(self, request):
        request_body = get_request_body(request)
        result = Polls.checkCollision(request_body['username'], request_body['timeToCheck']['startDate'], request_body['timeToCheck']['endDate'])
        return JsonResponse({"data":result}, safe=False, content_type="application/json")