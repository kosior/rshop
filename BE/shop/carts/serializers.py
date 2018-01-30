from rest_framework.serializers import ModelSerializer

from .models import Cart, Item


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ('product', 'quantity')


class ItemsSerializer(ItemSerializer):
    def to_representation(self, instance):
        return {item.product_id: item.to_dict() for item in instance}


class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = ('uuid', 'created', 'user')
        read_only_fields = ('uuid', 'created')
