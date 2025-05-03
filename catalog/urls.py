from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, BrandViewSet, CollectionViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'brands', BrandViewSet)
router.register(r'collections', CollectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]