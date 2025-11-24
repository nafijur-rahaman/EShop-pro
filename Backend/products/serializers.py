from rest_framework import serializers
from .models import Product, Category, ProductImageClass

# ------------------- Category Serializer -------------------#
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# ------------------- Product Image Serializer -------------------#
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImageClass
        fields = ['id', 'image']


# ------------------- Product Serializer -------------------#
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )
    category_name = serializers.CharField(source='category.name', read_only=True)  # frontend-friendly

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'stock_unit',
            'sold', 'category', 'category_name', 'images', 'uploaded_images', 'created_at'
        ]

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        product = Product.objects.create(**validated_data)

        for img in uploaded_images:
            ProductImageClass.objects.create(product=product, image=img)

        return product
