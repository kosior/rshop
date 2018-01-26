from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import CartSerializer


class CreateCart(CreateAPIView):
    serializer_class = CartSerializer
    permission_classes = (AllowAny,)
