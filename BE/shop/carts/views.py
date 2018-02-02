from django.db.models import F
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Item
from .serializers import CartSerializer, ItemsSerializer


class CreateCart(CreateAPIView):
    serializer_class = CartSerializer
    permission_classes = (AllowAny,)


class ItemsViewSet(GenericAPIView):
    serializer_class = ItemsSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Item.objects.filter(cart_id=self.kwargs['cart_uuid']).select_related('product')

    def create_or_update(self, request, *args, **kwargs):
        item_kwargs = {'cart_id': kwargs.get('cart_uuid'), 'product_id': request.data['product']}
        quantity_kwarg_map = {1: {'quantity__gte': 0}, -1: {'quantity__gte': 1}}
        quantity = int(request.data['quantity'])

        assert quantity in (1, -1)

        rows_updated = Item.objects.filter(**item_kwargs,
                                           **quantity_kwarg_map[quantity]).update(quantity=F('quantity') + quantity)

        if rows_updated == 0 and quantity == 1:
            Item.objects.create(**item_kwargs)

    def retrieve(self, request, *args, **kwargs):
        items = self.get_queryset()
        serializer = self.get_serializer(items)
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        self.create_or_update(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        cart_uuid = kwargs.get('cart_uuid')
        deleted_num, _ = Item.objects.filter(cart_id=cart_uuid).delete()
        return Response({'deleted_num': deleted_num})
