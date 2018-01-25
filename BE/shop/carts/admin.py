from django.contrib import admin

from .models import Cart, Item


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    pass
