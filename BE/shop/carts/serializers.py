from rest_framework.serializers import ModelSerializer

from .models import Cart


class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = ('uuid', 'created', 'user')
        read_only_fields = ('uuid', 'created')
