from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(ModelViewSet):
    authentication_classes = []
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)
    queryset = Product.objects.select_related('category').all()
    parser_classes = (MultiPartParser, FormParser,)

    def perform_create(self, serializer):
        serializer.save(image=self.request.data.get('image'))

    def perform_update(self, serializer):
        image = self.request.data.get('image')
        image_kw = {'image': image} if image else {}
        serializer.save(**image_kw)

