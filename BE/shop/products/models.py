from django.db import models

from categories.models import Category
from common.models import BaseModel


class Product(BaseModel):
    category = models.ForeignKey(Category, related_name='products', blank=True, null=True)
    name = models.CharField(max_length=128)
    description = models.TextField()
    price = models.DecimalField(max_digits=15, decimal_places=2)
    image_url = models.URLField()

    def __str__(self):
        return self.name
