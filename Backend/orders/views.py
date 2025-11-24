import uuid
from rest_framework import generics
from rest_framework.response import Response

from .models import Cart, CartItem, Order, OrderItem
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer


# ---------------------- HELPER ---------------------- #
def get_or_create_cart(request):
    user = request.user if request.user.is_authenticated else None

    if user:
        cart, created = Cart.objects.get_or_create(user=user)
        return cart

    # handle guest carts
    if not request.session.session_key:
        request.session.create()

    cart, created = Cart.objects.get_or_create(session_key=request.session.session_key)
    return cart


# ---------------------- CART VIEW ---------------------- #
class CartView(generics.GenericAPIView):
    serializer_class = CartSerializer

    def get(self, request):
        cart = get_or_create_cart(request)
        return Response(CartSerializer(cart).data)

    def post(self, request):
        cart = get_or_create_cart(request)
        serializer = CartItemSerializer(data=request.data)

        if serializer.is_valid():
            product_id = serializer.validated_data["product_id"]
            quantity = serializer.validated_data["quantity"]

            item, created = CartItem.objects.get_or_create(
                cart=cart, product_id=product_id
            )

            if not created:
                item.quantity += quantity
            else:
                item.quantity = quantity

            item.save()

            return Response(CartSerializer(cart).data)
        return Response(serializer.errors, status=400)



class CheckoutView(generics.GenericAPIView):
    serializer_class = OrderSerializer

    def post(self, request):
        cart = get_or_create_cart(request)

        if not cart.items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        shipping_address = request.data.get("shipping_address", "")
        order_uuid = uuid.uuid4().hex[:12].upper()

        total_amount = sum(
            item.product.price * item.quantity for item in cart.items.all()
        )

        order = Order.objects.create(
            user=request.user if request.user.is_authenticated else None,
            order_id=order_uuid,
            total_amount=total_amount,
            shipping_address=shipping_address,
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )

        # empty cart
        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=201)
