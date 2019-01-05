from django.http import JsonResponse
from django.views import View
from web_API.views.utilities import *
from web_API.dataAccessLayer.Comment import Comment


class AddCommentView(View):
    def post(self, request):
        request_body = get_request_body(request)
        comment_id = Comment.add_comment(request_body)

        return JsonResponse({"OK": "True", "createdCommentId": comment_id}, content_type="application/json")