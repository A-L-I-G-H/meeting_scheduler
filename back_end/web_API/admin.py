from django.contrib import admin
from .models import *

admin.site.register(votes)
admin.site.register(event_polls)
admin.site.register(options)
admin.site.register(contributes)