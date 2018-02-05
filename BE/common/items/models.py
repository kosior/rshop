from django.db import models

from common.models import BaseModel
from products.models import Product


class BaseItem(BaseModel):
    product = models.ForeignKey(Product, related_name='+')
    quantity = models.PositiveSmallIntegerField(default=1)

    class Meta:
        abstract = True
