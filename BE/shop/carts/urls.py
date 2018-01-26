from django.conf.urls import url

from .views import CreateCart

app_name = 'carts'

urlpatterns = [
    url(r'^$', CreateCart.as_view(), name='create'),
]
