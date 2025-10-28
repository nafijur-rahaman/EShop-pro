from django.db import models
from django.contrib.auth.models import AbstractUser

ROLE_CHOICES = (

    ('customer', 'Customer'),
    ('admin', 'Admin'),
)

class User(AbstractUser):
    firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES,default='customer')
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)


    def is_admin(self):
        return self.role == 'admin'
    
    def is_customer(self):
        return self.role == 'customer'
    
    def __str__(self):
        return self.username
    
