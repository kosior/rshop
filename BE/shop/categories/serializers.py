from rest_framework.serializers import ModelSerializer

from .models import Category


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')
        read_only_fields = ('id',)
