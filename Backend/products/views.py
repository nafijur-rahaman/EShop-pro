from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer





# ------------------- Category Views -------------------#
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# ------------------- Category Detail View -------------------#
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# ------------------- Product Views -------------------#
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# ------------------- Product Detail View -------------------#
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer