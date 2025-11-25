from .models import Order, OrderItem, CartItem
from django.contrib import admin


admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(CartItem)