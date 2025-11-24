from rest_framework import serializers
from orders.models import Order

class PaymentInitSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
