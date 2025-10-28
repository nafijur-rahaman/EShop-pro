from rest_framework import serializers
from .models import User



#----------------------user serializer----------------------#

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active']
        read_only_fields = ['id', 'is_active']

