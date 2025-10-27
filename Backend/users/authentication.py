from rest_framework import authentication, exceptions
from firebase_admin import auth as firebase_auth
from .models import User

class FirebaseAuthentication(authentication.BaseAuthentication):


    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None  


        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        else:
            token = auth_header

        try:
            decoded_token = firebase_auth.verify_id_token(token)
        except Exception:
            raise exceptions.AuthenticationFailed('Invalid or expired Firebase token')

        uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        display_name = decoded_token.get('name') or decoded_token.get('displayName') or uid

        # Get or create user
        user, created = User.objects.get_or_create(
            firebase_uid=uid,
            defaults={
                'username': display_name,
                'first_name': display_name,
                'email': email or '',
                'role': 'customer',
            }
        )


        updated = False
        if not created:
            if user.username != display_name:
                user.username = display_name
                updated = True
            if user.first_name != display_name:
                user.first_name = display_name
                updated = True
            if email and user.email != email:
                user.email = email
                updated = True
            if updated:
                user.save()

        return (user, None)
