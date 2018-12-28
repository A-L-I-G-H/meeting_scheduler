from django.contrib import admin
from web_API.models.Votes import *
from web_API.models.EventPolls import *
from web_API.models.Options import *
from web_API.models.Contributes import *

admin.site.register(Contributes)
admin.site.register(Votes)
admin.site.register(EventPolls)
admin.site.register(Options)
