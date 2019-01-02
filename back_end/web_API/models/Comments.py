from django.db import models
from web_API.models import Options
from django.contrib.auth.models import User

class Comments(models.Model):
    option = models.ForeignKey(Options, on_delete= models.CASCADE)
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    text = models.CharField(max_length= 100)
    reply_id = models.IntegerField

    class Meta:
        db_table = 'Comments'
        app_label = 'web_API'