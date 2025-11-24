import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from orders.models import Order

class SSLCommerzInitPayment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)

        # Payload for SSLCommerz
        payload = {
            'store_id': settings.SSL_COMMERZ_STORE_ID,
            'store_passwd': settings.SSL_COMMERZ_STORE_PASSWORD,
            'total_amount': str(order.total_amount),
            'currency': 'BDT',
            'tran_id': str(order.id),
            'success_url': request.build_absolute_uri(f'/payments/success/{order.id}/'),
            'fail_url': request.build_absolute_uri(f'/payments/fail/{order.id}/'),
            'cancel_url': request.build_absolute_uri(f'/payments/cancel/{order.id}/'),
            'cus_name': request.user.username,
            'cus_email': request.user.email,
        }

        response = requests.post(settings.SSL_COMMERZ_SESSION_API, data=payload)
        data = response.json()
        return Response(data)


class SSLCommerzPaymentSuccess(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)

        val_id = request.data.get('val_id')
        tran_id = request.data.get('tran_id')
        amount = request.data.get('amount')

        # Optional: validate with SSLCommerz server
        validation_payload = {
            'val_id': val_id,
            'store_id': settings.SSL_COMMERZ_STORE_ID,
            'store_passwd': settings.SSL_COMMERZ_STORE_PASSWORD,
            'format': 'json'
        }
        validation_res = requests.get(settings.SSL_COMMERZ_VALIDATION_API, params=validation_payload)
        val_data = validation_res.json()

        if val_data.get('status') == 'VALID' and float(amount) == float(order.total_amount):
            order.payment_status = 'completed'
            order.transaction_id = tran_id
            order.save()
            return Response({'message': 'Payment successful', 'order_id': order.id})
        else:
            order.payment_status = 'failed'
            order.save()
            return Response({'message': 'Payment validation failed', 'order_id': order.id}, status=400)


class SSLCommerzPaymentFail(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        order = Order.objects.filter(id=order_id, user=request.user).first()
        if order:
            order.payment_status = 'failed'
            order.save()
        return Response({'message': 'Payment failed'})


class SSLCommerzPaymentCancel(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        order = Order.objects.filter(id=order_id, user=request.user).first()
        if order:
            order.payment_status = 'cancelled'
            order.save()
        return Response({'message': 'Payment cancelled'})
