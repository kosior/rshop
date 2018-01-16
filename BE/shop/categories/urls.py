from django.conf.urls import url

from .views import CategoriesList

app_name = 'categories'

urlpatterns = [
    url(r'^$', CategoriesList.as_view(), name='list'),
]
