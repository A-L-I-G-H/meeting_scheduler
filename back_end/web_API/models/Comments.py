from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

class Comments(models.Model):
    option = models.ForeignKey('Options', on_delete= models.CASCADE)
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    text = models.CharField(max_length= 100)
    reply_id = models.IntegerField(null=False)

    class Meta:
        db_table = 'Comments'
        app_label = 'web_API'


admin.site.register(Comments)