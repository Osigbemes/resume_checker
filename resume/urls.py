
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserRegistration, Login, JobDetailsView, SendEmail, GetAllUsers, GetJobDetails, GetAllJobDetails
from django.conf import settings
from django.conf.urls.static import static

app_name = 'HealthSystem'

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistration.as_view(), name='register'),
    path('login/', Login.as_view(), name='login'),
    path('job_details/', JobDetailsView.as_view(), name='job_details'),
    path('get_users/', GetAllUsers.as_view(), name='get_users'),
    path('get_job_details/<str:pk>', GetJobDetails.as_view(), name='get_job_details'),
    path('get_job_details/', GetAllJobDetails.as_view(), name='get_job_details'),
    path('send_email/<str:pk>', SendEmail.as_view(), name='send_email'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)