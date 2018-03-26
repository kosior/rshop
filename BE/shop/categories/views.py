from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .models import Category
from .serializers import CategorySerializer


class CategoriesList(ListAPIView):
    authentication_classes = []
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)
    queryset = Category.objects.all()
    filter_backends = (OrderingFilter,)
    ordering_fields = ('name',)
