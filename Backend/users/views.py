from django.contrib.auth import authenticate
import django.utils.timezone as timezone
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

# for sending confirmation email
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string



# importing models and serializers
from .models import User
from .serializers import UserRegistrationSerializer







#----------------------user registration----------------------#
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        email_subject = "Welcome to EShop Pro"
        email_body = render_to_string('registration_email.html', {'user': user, 'now': timezone.now()})
        email = EmailMultiAlternatives(email_subject, '', to=[user.email])
        email.attach_alternative(email_body, 'text/html')
        email.send()
        return Response({
            "user": UserRegistrationSerializer(user, context=self.get_serializer_context()).data,
            "message": "User registered successfully."
        }, status=status.HTTP_201_CREATED)

     
     
#----------------------user login----------------------#   
class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # print(username, password)  # Debugging line
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": UserRegistrationSerializer(user).data,
                "token": token.key,
                "message": "Login successful."
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)



#----------------------user logout----------------------#
class UserLogoutView(APIView):


    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "User not logged in."}, status=status.HTTP_400_BAD_REQUEST)
