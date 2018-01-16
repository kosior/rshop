from rest_framework.serializers import ModelSerializer

from .models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'category', 'name', 'description', 'price', 'image_url')
        read_only_fields = ('id',)
