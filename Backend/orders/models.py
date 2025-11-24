from django.db import models
from django.conf import settings
from products.models import Product

User = settings.AUTH_USER_MODEL


# ---------------------- CART ITEM ---------------------- #
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # avoid duplicates

    def __str__(self):
        return f"{self.user} - {self.product.name} ({self.quantity})"


# ---------------------- ORDER ---------------------- #
class Order(models.Model):
    PAYMENT_STATUSES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUSES, default='pending')
    transaction_id = models.CharField(max_length=100, null=True, blank=True)  # SSLCommerz
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user} - {self.payment_status}"


# ---------------------- ORDER ITEM ---------------------- #
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)  # snapshot of price

    @property
    def total_price(self):
        return self.price * self.quantity

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
