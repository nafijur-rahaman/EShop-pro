import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import redirect
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from orders.models import Order
from rest_framework.response import Response


# ---------------------- INIT PAYMENT ---------------------- #
@method_decorator(csrf_exempt, name='dispatch')
class SSLCommerzInitPayment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')

        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)

        tran_id = f"TXN-{order.id}-{timezone.now().strftime('%Y%m%d%H%M%S')}"
        order.transaction_id = tran_id
        order.save()

        # Decide sandbox or live API
        session_api = getattr(settings, "SSL_COMMERZ_SESSION_API", "https://sandbox.sslcommerz.com/gwprocess/v4/api.php")

        payload = {
            'store_id': settings.SSL_COMMERZ_STORE_ID,
            'store_passwd': settings.SSL_COMMERZ_STORE_PASSWORD,
            'total_amount': str(order.total_amount),
            'currency': 'BDT',
            'tran_id': tran_id,

            'success_url': f"{settings.BACKEND_URL}/api/payments/success/{order.id}/",
            'fail_url': f"{settings.BACKEND_URL}/api/payments/fail/{order.id}/",
            'cancel_url': f"{settings.BACKEND_URL}/api/payments/cancel/{order.id}/",

            'cus_name': request.user.username,
            'cus_email': request.user.email,
        }

        try:
            response = requests.post(session_api, data=payload, timeout=10)
            response.raise_for_status()
            session_data = response.json()
        except (requests.RequestException, ValueError) as e:
            print("SSLCommerz Init Payment Error:", e)
            print("Response text:", getattr(response, "text", None))
            return Response({'error': 'Failed to initiate payment'}, status=500)

        return Response(session_data)


# ---------------------- PAYMENT SUCCESS ---------------------- #
@method_decorator(csrf_exempt, name='dispatch')
class SSLCommerzPaymentSuccess(APIView):
    permission_classes = [AllowAny]

    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return redirect(f"{settings.FRONTEND_URL}/payment/fail/{order_id}")

        # Get params sent by SSLCommerz
        val_id = request.GET.get("val_id")
        tran_id = request.GET.get("tran_id")
        amount = request.GET.get("amount")

        # ----------------- DEVELOPMENT MOCK ----------------- #
        if settings.DEBUG:
            # Mock payment success for local development
            print("DEBUG MODE: Mocking payment success")
            order.payment_status = "completed"
            order.transaction_id = tran_id or order.transaction_id
            order.save()
            return redirect(f"{settings.FRONTEND_URL}/payment/success/{order.id}")

        # ----------------- VALIDATION WITH GATEWAY ----------------- #
        if not val_id or not tran_id or not amount:
            print("Missing required GET params from gateway:", request.GET)
            order.payment_status = "failed"
            order.save()
            return redirect(f"{settings.FRONTEND_URL}/payment/fail/{order.id}")

        validation_payload = {
            "val_id": val_id,
            "store_id": settings.SSL_COMMERZ_STORE_ID,
            "store_passwd": settings.SSL_COMMERZ_STORE_PASSWORD,
            "format": "json",
        }

        validation_api = getattr(settings, "SSL_COMMERZ_VALIDATION_API", "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php")

        try:
            response = requests.get(validation_api, params=validation_payload, timeout=10)
            response.raise_for_status()
            validation_res = response.json()
        except (requests.RequestException, ValueError) as e:
            print("SSLCommerz Validation Error:", e)
            print("Response text:", getattr(response, "text", None))
            order.payment_status = "failed"
            order.save()
            return redirect(f"{settings.FRONTEND_URL}/payment/fail/{order.id}")

        # Check payment
        if validation_res.get("status") == "VALID" and float(amount) == float(order.total_amount):
            # Deduct stock
            for item in order.items.all():
                product = item.product
                if product.stock_unit < item.quantity:
                    order.payment_status = "failed"
                    order.save()
                    return redirect(f"{settings.FRONTEND_URL}/payment/fail/{order.id}")

                product.stock_unit -= item.quantity
                product.sold += item.quantity
                product.save()

            order.payment_status = "completed"
            order.transaction_id = tran_id
            order.save()
            return redirect(f"{settings.FRONTEND_URL}/payment/success/{order.id}")

        # Amount mismatch or invalid
        order.payment_status = "failed"
        order.save()
        return redirect(f"{settings.FRONTEND_URL}/payment/fail/{order.id}")


# ---------------------- PAYMENT FAIL ---------------------- #
@method_decorator(csrf_exempt, name='dispatch')
class SSLCommerzPaymentFail(APIView):
    permission_classes = [AllowAny]

    def post(self, request, order_id):
        Order.objects.filter(id=order_id).update(payment_status='failed')
        return redirect(f"{settings.FRONTEND_URL}/payment/fail/{order_id}")


# ---------------------- PAYMENT CANCEL ---------------------- #
@method_decorator(csrf_exempt, name='dispatch')
class SSLCommerzPaymentCancel(APIView):
    permission_classes = [AllowAny]

    def post(self, request, order_id):
        Order.objects.filter(id=order_id).update(payment_status='cancelled')
        return redirect(f"{settings.FRONTEND_URL}/payment/cancel/{order_id}")
