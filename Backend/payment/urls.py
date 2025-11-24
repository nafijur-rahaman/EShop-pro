from django.urls import path
from .views import (
    SSLCommerzInitPayment,
    SSLCommerzPaymentSuccess,
    SSLCommerzPaymentFail,
    SSLCommerzPaymentCancel,
)

urlpatterns = [
    path('payments/init/', SSLCommerzInitPayment.as_view(), name='ssl-init'),
    path('payments/success/<int:order_id>/', SSLCommerzPaymentSuccess.as_view(), name='ssl-success'),
    path('payments/fail/<int:order_id>/', SSLCommerzPaymentFail.as_view(), name='ssl-fail'),
    path('payments/cancel/<int:order_id>/', SSLCommerzPaymentCancel.as_view(), name='ssl-cancel'),
]
