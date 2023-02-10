import requests
from rest_framework.views import APIView
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import send_mail
from django.conf import settings
import jwt
from django.core.mail import EmailMessage, send_mail

class Util:
    @staticmethod
    def sendMail(emailBody):
        
        send_mail(emailBody['subject'], emailBody['email_body'], emailBody['email_from'], emailBody['to_email'])


class UtilEmail:
    @staticmethod

    def sendEmail(data):
        
        username=data['username']
        email = data['email']
        interviewDay = data['interviewDay']

        
        emailBody = f'Dear {username}' + '\n'+ f'Congratulations on successfully passing your resume screening! We are pleased to invite you for an interview on {interviewDay}.' + '\n' +'\n' + 'The interview will be conducted virtually via Zoom and the meeting details will be shared with you shortly'  + '\n'+ 'We look forward to getting to know you better and answer any questions you may have about the role.' + '\n'+'Kind regards' + '\n' + 'Resume Ranking Inc\n'

        subject = f'Scheduling an Interview for {username}'
        message = emailBody
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email, ]


        data = {'email_body':message, 'email_from':email_from, 'to_email':recipient_list, 'subject':subject}
        #send email
        Util.sendMail(data) 