import uuid
from django.db import models

from common.models import BaseModel
from products.models import Product
from users.models import User


class Cart(BaseModel):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name='carts', blank=True, null=True)


class Item(BaseModel):
    cart = models.ForeignKey(Cart, related_name='items')
    product = models.ForeignKey(Product, related_name='+')
    quantity = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('cart', 'product')
