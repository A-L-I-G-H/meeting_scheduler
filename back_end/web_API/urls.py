from django.urls import path
from web_API.views import *

urlpatterns = [
    path('polls/', GetPollView.as_view()),
    path('polls/owner', GetCreatedPollsView.as_view()),
    path('polls/involved', GetInvolvedPollsView.as_view()),
    path('polls/createPoll', CreateNewPollView.as_view()),
    path('polls/finalize', FinalizePollView.as_view()),
    path('votes', VoteView.as_view()),
    path('comments', AddCommentView.as_view()),
    path('polls/reopen', ReopenView.as_view()),
    path('checkCollision', CollisionView.as_view()),
]