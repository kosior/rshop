from rest_framework.serializers import ModelSerializer

from .models import Cart, Item


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ('product', 'quantity')


class ItemsSerializer(ItemSerializer):
    def to_representation(self, instance):
        return {item.product_id: self.item_to_dict(item) for item in instance}

    def item_to_dict(self, item):
        return {
            'quantity': item.quantity,
            'name': item.product.name,
            'price': item.product.price,
            'image_url': self.context['request'].build_absolute_uri(item.product.image_url)
        }


class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = ('uuid', 'created', 'user')
        read_only_fields = ('uuid', 'created')
