from django.db.models import F
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Item
from .serializers import CartSerializer


class CreateCart(CreateAPIView):
    serializer_class = CartSerializer
    permission_classes = (AllowAny,)


class CreateOrUpdateItem(APIView):
    permission_classes = (AllowAny,)

    def create_or_update(self, request, *args, **kwargs):
        action = 'updated'
        cart_uuid = kwargs.get('cart_uuid')

        rows_updated = Item.objects.filter(cart_id=cart_uuid, **request.data).update(quantity=F('quantity') + 1)

        if rows_updated == 0:
            action = 'created'
            Item.objects.create(cart_id=cart_uuid, **request.data)

        return Response({'action': action})

    def post(self, request, *args, **kwargs):
        return self.create_or_update(request, *args, **kwargs)
