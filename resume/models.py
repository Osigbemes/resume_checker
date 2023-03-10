from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.db.models import CharField
from django_mysql.models import ListCharField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, username, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(username, password, **other_fields)

    def create_user(self, username, password, **other_fields):

        if not username:
            raise ValueError(_('You must provide a username'))

        user = self.model(username=username, password=password,**other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):

    class UserStatus(models.TextChoices):
        EMPLOYER = 'ER', _('EMPLOYER')
        EMPLOYEE = 'EE', _('EMPLOYEE')

    userStatus = models.CharField(
        max_length=2,
        choices=UserStatus.choices,
        default=UserStatus.EMPLOYEE,
    )

    username= models.CharField(max_length=200, unique=True)
    firstname = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=250, unique=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    start_date = models.DateTimeField(default=timezone.now)
    token = models.TextField(blank=True)
    objects = CustomAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class JobDetails(models.Model):
    user = models.IntegerField(null=True, blank=True)
    name = models.CharField(blank=True, null=True, max_length=100)
    skillSet = models.CharField(blank=True, null=True, max_length=2000)
    phone_number = models.CharField(blank=True, null=True, max_length=30)
    role = models.CharField(max_length=100)
    score = models.IntegerField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    document = models.FileField(blank=False, null=False)
    interviewDay = models.DateTimeField(default=timezone.now, null=True, blank = True)
    
    def __str__(self):
        return self.email
