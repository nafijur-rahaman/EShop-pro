from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction

from .models import CartItem, Order, OrderItem
from .serializers import CartItemSerializer, OrderSerializer

# ---------------------- CART ---------------------- #
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 1))

        item, created = CartItem.objects.get_or_create(
            user=request.user,
            product_id=product_id,
            defaults={'quantity': quantity}
        )
        if not created:
            item.quantity += quantity
            item.save()

        return Response(CartItemSerializer(item).data)


class UpdateCartItem(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            item = CartItem.objects.get(id=pk, user=request.user)
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)

        item.quantity = request.data.get('quantity', item.quantity)
        item.save()
        return Response(CartItemSerializer(item).data)

    def delete(self, request, pk):
        try:
            item = CartItem.objects.get(id=pk, user=request.user)
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)

        item.delete()
        return Response({'message': 'Deleted'})


class ClearCart(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        CartItem.objects.filter(user=request.user).delete()
        return Response({'message': 'Cart cleared'})


# ---------------------- ORDER ---------------------- #
class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic  # ensures atomicity
    def post(self, request):
        cart_items = CartItem.objects.select_for_update().filter(user=request.user)
        if not cart_items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        total = 0
        for item in cart_items:
            if item.quantity > item.product.stock_unit:
                return Response({'error': f'Not enough stock for {item.product.name}'}, status=400)
            total += item.product.price * item.quantity

        order = Order.objects.create(user=request.user, total_amount=total)

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
            # decrease stock and increase sold
            item.product.stock_unit -= item.quantity
            item.product.sold += item.quantity
            item.product.save()

        cart_items.delete()
        return Response({'order_id': order.id, 'message': 'Order created'})


class MyOrders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            order = Order.objects.get(id=pk, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)

        serializer = OrderSerializer(order)
        return Response(serializer.data)
