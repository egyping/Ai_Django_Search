from django.urls import path
from .views import SearchView, SearchCategoryView

urlpatterns = [
    path('', SearchView.as_view(), name='search'),
    path('<str:category>/', SearchCategoryView.as_view(), name='search-category'),
]