from django.core.mail import send_mail

sender_mail = "meetingschedulerforyou@gmail.com"

def send_email_to_users(subject, body, email_list):
    send_mail(subject, body, sender_mail, email_list)
