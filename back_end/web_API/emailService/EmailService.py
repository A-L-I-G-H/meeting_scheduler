from django.core.mail import send_mail

sender_mail = "meetinschedulerforyou@gmail.com"

def send_mail_to_users(subject, body, email_addresses):
    send_mail(subject, body, sender_mail, email_addresses)
