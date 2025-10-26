from django.db import models
from django.contrib.auth.models import AbstractUser

ROLE_CHOICES = (

    ('customer', 'Customer'),
    ('admin', 'Admin'),
)

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    is_active = models.BooleanField(default=True)

    def is_admin(self):
        return self.role == 'admin'
    
    def is_customer(self):
        return self.role == 'customer'
    
    def __str__(self):
        return self.username
    
