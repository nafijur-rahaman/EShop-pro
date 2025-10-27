from rest_framework import serializers
from .models import Product, Category,ImgageClass

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgageClass
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ImageSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'image', 'price', 'category', 'category_id',
            'stock_unit', 'sold', 'description', 'created_at'
        ]
