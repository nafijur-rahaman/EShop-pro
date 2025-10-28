from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth as firebase_auth

# importing models and serializers
from .models import User
from .serializers import UserSerializer



class FirebaseLoginView(APIView):

    def post(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({"error": "No token provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Extract token
        token = auth_header.split(' ').pop()
        try:
            decoded_token = firebase_auth.verify_id_token(token)
        except Exception as e:
            return Response({"error": f"Invalid Firebase token: {e}"}, status=status.HTTP_401_UNAUTHORIZED)

        uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        display_name = decoded_token.get('name') or decoded_token.get('displayName') or uid

        user, created = User.objects.get_or_create(
            firebase_uid=uid,
            defaults={
                'username': display_name,
                'first_name': display_name,
                'email': email or '',
                'role': 'customer',
            }
        )

        serializer = UserSerializer(user)
        return Response({
            "user": serializer.data,
            "created": created,
            "message": "User authenticated via Firebase"
        }, status=status.HTTP_200_OK)