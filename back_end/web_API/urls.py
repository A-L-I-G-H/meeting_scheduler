from django.urls import path
from web_API.views import *

urlpatterns = [
    path('polls/owner', GetCreatedPollsView.as_view()),
    path('polls/involved', GetInvolvedPollsView.as_view()),
    path('polls/createPoll', CreateNewPollView.as_view()),
    path('polls/finalize', FinalizePollView.as_view()),
    path('polls/vote', VoteView.as_view()),
]