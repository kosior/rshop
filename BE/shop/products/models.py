from django.db import models
from versatileimagefield.fields import VersatileImageField, PPOIField
from versatileimagefield.placeholder import OnStoragePlaceholderImage

from categories.models import Category
from common.models import BaseModel


class Product(BaseModel):
    category = models.ForeignKey(Category, related_name='products', blank=True, null=True)
    name = models.CharField(max_length=128)
    description = models.TextField()
    price = models.DecimalField(max_digits=15, decimal_places=2)
    image = VersatileImageField(upload_to='images/', blank=True,
                                placeholder_image=OnStoragePlaceholderImage(path='placeholder.png'), ppoi_field='ppoi')
    ppoi = PPOIField()

    def __str__(self):
        return self.name

    @property
    def image_url(self):
        return self.image.crop['388x240'].url
