from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

# ------------------- CATEGORY VIEW -------------------
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# ------------------- PRODUCT VIEW -------------------
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
