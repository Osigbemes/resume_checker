
from rest_framework import serializers
from .models import User, JobDetails

class UserSerializer(serializers.ModelSerializer):
    USERSTATUS=(
            ('ER', 'EMPLOYER'),
            ('EE', 'EMPLOYEE')
        )

    password = serializers.CharField(min_length=8, write_only=True)
    userStatus = serializers.ChoiceField(choices=USERSTATUS)

    class Meta:
        model = User
        fields = ('email', 'password', 'username', 'userStatus')
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        status = validated_data.pop('userStatus', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.is_active=True
        instance.userStatus= status
        instance.save()
        return instance

class JobDetailsSerializer(serializers.ModelSerializer):
    
    user_id = serializers.IntegerField()

    class Meta():
        model = JobDetails
        fields = ('document', 'id', 'role', 'score', 'interviewDay', 'email', 'name', 'phone_number', 'user_id')
        extra_kwargs = {'score': {'read_only':True}, 'name':{'read_only':True}, 'email':{'read_only':True}, 'phone_number':{'read_only':True}, 'user_id':{}}
   
class SendEmailSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField()
    
    class Meta:
        model = JobDetails
        fields = ('interviewDay', 'email', 'username')
        
    def create(self, validated_data):
        
        return validated_data
    
class GetUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only':True}}
        
class GetJobDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDetails
        fields = '__all__'