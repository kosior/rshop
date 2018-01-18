from rest_framework.serializers import ModelSerializer, SlugField

from .models import Product


class ProductSerializer(ModelSerializer):
    category_slug = SlugField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'category', 'category_slug', 'name', 'description', 'price', 'image_url')
        read_only_fields = ('id', )
