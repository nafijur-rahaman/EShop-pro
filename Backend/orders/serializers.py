from rest_framework import serializers
from .models import CartItem, Order, OrderItem
from products.serializers import ProductSerializer

# ---------------------- CART ---------------------- #
class CartItemSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_detail', 'quantity']


# ---------------------- ORDER ITEM ---------------------- #
class OrderItemSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_detail', 'quantity', 'price', 'total_price']


# ---------------------- ORDER ---------------------- #
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'total_amount', 'payment_status', 'transaction_id', 'created_at', 'items']
