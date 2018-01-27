from django.contrib import admin

from .models import Cart, Item


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    pass


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('cart_id', 'product_id', 'quantity',)
