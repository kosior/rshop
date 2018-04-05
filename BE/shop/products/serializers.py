from rest_framework.serializers import ModelSerializer, SlugField, SerializerMethodField
from .models import Product


class ProductSerializer(ModelSerializer):
    category_slug = SlugField(source='category.slug', read_only=True)
    image = SerializerMethodField('get_image_url')

    class Meta:
        model = Product
        fields = ('id', 'category', 'category_slug', 'name', 'description', 'price', 'image')
        read_only_fields = ('id', )

    def get_image_url(self, obj):
        return self.context['request'].build_absolute_uri(obj.image_url)
