from rest_framework.serializers import ModelSerializer

from users.models import Address
from users.serializers import AddressSerializer
from .models import Order, OrderItem


class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('product', 'quantity')


class OrderSerializer(ModelSerializer):
    address = AddressSerializer()
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('uuid', 'user', 'confirmed', 'total', 'address', 'items')
        read_only_fields = ('uuid', 'user', 'confirmed', 'total')

    def create(self, validated_data):
        total = 0
        order_items = []

        items_data = validated_data.pop('items')
        address_data = validated_data.pop('address')
        user = validated_data.pop('user')

        address = Address.objects.create(**address_data)
        order = Order.objects.create(user=user, address=address)

        for item_data in items_data:
            order_item = OrderItem(order=order, **item_data)
            order_items.append(order_item)
            total += order_item.total_price()

        OrderItem.objects.bulk_create(order_items)

        order.total = total
        order.save()

        return order
