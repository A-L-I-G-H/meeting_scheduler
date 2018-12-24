from django.urls import path
from web_API.views import *

urlpatterns = [
    path('polls/owner', GetCreatedPollsView.as_view()),
]