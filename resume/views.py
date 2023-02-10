
from decimal import Decimal
from urllib import request
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework import generics
from .models import User, JobDetails
from .resume import Analyzer
from io import TextIOWrapper
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, JobDetailsSerializer, SendEmailSerializer
from rest_framework.permissions import AllowAny
from .check_resume import extract_skills, get_result, get_phonenumber, get_names, get_emails
from .utils import UtilEmail

class UserRegistration(generics.CreateAPIView):
    permission_classes=[AllowAny]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            token=RefreshToken.for_user(user).access_token
            user.token = token
            user.save()
            
            #user already has a bank account
            # User.objects.filter(customer=user).update(balance=user.initialDeposit,
            #  bankName = user.accountName, accountNumber=user.accountNumber, accountName=user.accountName)
            
            if user:
                return Response({'success':True, 'message':f'Account created successfully {serializer.data}'}, status=status.HTTP_200_OK)
        return Response({'success':False, 'message':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class BlacklistTokenUpdateView(APIView):
    # the reason we are blacklisting is that when the user logs out we have to black list the refresh token.
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("You are logged out", status=status.HTTP_408_REQUEST_TIMEOUT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # here we are extending the serializer class by customizing the token.
    @classmethod
    def get_token(cls, user):
        #get the token of the user by overwriting the function in the class
        token = super().get_token(user)
        #Add custom claims
        token['username']=user.username
        token['is_staff']=user.is_staff
        token['is_active']=user.is_active
        token['userStatus']=user.userStatus
        return token

class Login(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class SendEmail(generics.UpdateAPIView):
    serializer_class=SendEmailSerializer
    
    def update(self, request, pk, *args, **kwargs):
        
        job_details = JobDetails.objects.get(id=pk)
        email_serializer = self.serializer_class(instance=job_details, data=request.data)
        
        if email_serializer.is_valid():
            if job_details:
                email = email_serializer.save()
                job_details.email = email.email
                job_details.interviewDay = email.interviewDay
                email.save()
                
                # send email to the employee
                UtilEmail.sendEmail(data={'username':email.username, 'email':job_details.email, 'interviewDay':job_details.interviewDay})  
                
                return Response({'success':True, 'message':f'Email sent successfully! {email_serializer.data}'},  status=status.HTTP_200_OK)
            
        return Response({'success':False, 'message':email_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                

class JobDetailsView(APIView):
  parser_classes = (MultiPartParser, FormParser)
  serializer_class = JobDetailsSerializer
  queryset = JobDetails

  def post(self, request, *args, **kwargs):
    file_serializer = self.serializer_class(data=request.data)
    if file_serializer.is_valid():
        file = file_serializer.save()
        
        file_path = file.document.file
        role = file.role
        
        # call resume checker
        result = get_result(str(file_path), role)
        phone_number = get_phonenumber(str(file_path))
        names = get_names(str(file_path))
        email = get_emails(str(file_path))
        
        required_skills = result[1]
        filtered_skills = result[0]

        candidate_score = (len(filtered_skills)/len(required_skills)) * 100
        #get user
        file.score = int(candidate_score)
        file.name = names
        file.email = email
        file.phone_number = phone_number
        file.save()

        return Response({'success':True, 'message':file_serializer.data}, status=status.HTTP_200_OK)
    else:
        return Response({'success':False, 'message':file_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)