import uuid

from django.db import models

from common.items.models import BaseItem
from common.models import BaseModel
from users.models import User, Address


class Order(BaseModel):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name='orders')
    address = models.ForeignKey(Address, related_name='orders')
    confirmed = models.BooleanField(default=False)
    total = models.PositiveIntegerField()

    def __str__(self):
        return str(self.uuid)[:8]


class OrderItem(BaseItem):
    order = models.ForeignKey(Order, related_name='items')

    class Meta:
        unique_together = ('order', 'product')

    def __str__(self):
        return f'{str(self.order_id)[:8]} - {self.product_id}'

    def total_price(self):
        return self.product.price * self.quantity
