from django.db.models import F
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Item
from .serializers import CartSerializer, ItemsSerializer


class CreateCart(CreateAPIView):
    authentication_classes = []
    serializer_class = CartSerializer
    permission_classes = (AllowAny,)


class ItemsViewSet(GenericAPIView):
    authentication_classes = []
    serializer_class = ItemsSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Item.objects.filter(cart_id=self.kwargs['cart_uuid']).select_related('product')

    def create_or_update(self, request, *args, **kwargs):
        item_kwargs = {'cart_id': kwargs.get('cart_uuid'), 'product_id': request.data['product']}
        item, created = Item.objects.get_or_create(**item_kwargs)
        if not created:
            quantity = int(request.data['quantity'])
            assert quantity in (1, -1)

            if quantity == -1 and item.quantity < 2:
                item.delete()
            else:
                item.quantity = F('quantity') + quantity
                item.save()

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
