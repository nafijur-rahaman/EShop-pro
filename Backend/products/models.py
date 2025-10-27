from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class ImgageClass(models.Model):
    image= models.ImageField(upload_to="product_images",blank=True, null=True)

class Product(models.Model):
    name = models.CharField(max_length=100)
    images=models.ManyToManyField(ImgageClass,blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    stock_unit = models.PositiveIntegerField(default=0)
    sold = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name