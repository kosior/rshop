from django.db.models import Prefetch
from rest_framework.viewsets import ModelViewSet

from .models import Order, OrderItem
from .serializers import OrderSerializer


class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        prefetch = Prefetch('items', queryset=OrderItem.objects.select_related('product'))
        qs = Order.objects.select_related('user', 'address').prefetch_related(prefetch)
        user = self.request.user
        if user.is_staff:
            return qs.all()
        return qs.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
