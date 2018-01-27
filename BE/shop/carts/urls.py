from django.conf.urls import url

from .views import CreateCart, ItemsViewSet

app_name = 'carts'

urlpatterns = [
    url(r'^$', CreateCart.as_view(), name='create'),
    url(r'^(?P<cart_uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/items/$', ItemsViewSet.as_view(),
        name='items'),
]
