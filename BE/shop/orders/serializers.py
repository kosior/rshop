from rest_framework.serializers import ModelSerializer, EmailField, CharField, DecimalField

from users.models import Address
from users.serializers import AddressSerializer
from .models import Order, OrderItem


class OrderItemSerializer(ModelSerializer):
    product_name = CharField(source='product.name', read_only=True)
    product_price = DecimalField(max_digits=15, decimal_places=2, source='product.price', read_only=True)

    class Meta:
        model = OrderItem
        fields = ('product', 'quantity', 'product_name', 'product_price')


class OrderSerializer(ModelSerializer):
    address = AddressSerializer()
    items = OrderItemSerializer(many=True)
    user_email = EmailField(source='user.email', read_only=True)

    class Meta:
        model = Order
        fields = ('uuid', 'user', 'confirmed', 'total', 'address', 'items', 'user_email', 'created')
        read_only_fields = ('uuid', 'user', 'confirmed', 'total', 'created')

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
