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
        return Item.objects.filter(cart_id=self.kwargs['cart_uuid'])

    def create_or_update(self, request, *args, **kwargs):
        cart_uuid = kwargs.get('cart_uuid')

        rows_updated = Item.objects.filter(cart_id=cart_uuid, **request.data).update(quantity=F('quantity') + 1)

        if rows_updated == 0:
            Item.objects.create(cart_id=cart_uuid, **request.data)

    def retrieve(self, request, *args, **kwargs):
        items = self.get_queryset()
        serializer = self.get_serializer(items)
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        self.create_or_update(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)
