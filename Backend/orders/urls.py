from django.urls import path
from .views import CartView, UpdateCartItem, ClearCart, CreateOrder, MyOrders, OrderDetail

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/item/<int:pk>/', UpdateCartItem.as_view(), name='cart-item-update'),
    path('cart/clear/', ClearCart.as_view(), name='cart-clear'),

    path('order/create/', CreateOrder.as_view(), name='order-create'),
    path('orders/', MyOrders.as_view(), name='my-orders'),
    path('orders/<int:pk>/', OrderDetail.as_view(), name='order-detail'),
]
