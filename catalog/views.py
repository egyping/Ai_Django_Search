from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Brand, Collection
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    BrandSerializer,
    CollectionSerializer
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_enabled=True).order_by('id')
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    @action(detail=False, methods=['get'])
    def category(self, request):
        category = request.query_params.get('type')
        if not category:
            return Response({"error": "Category parameter 'type' is required"}, status=400)
            
        products = self.queryset.filter(category=category)
        page = self.paginate_queryset(products)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.filter(is_enabled=True).order_by('id')
    serializer_class = BrandSerializer
    
    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        brand = self.get_object()
        products = Product.objects.filter(brand=brand, is_enabled=True).order_by('id')
        page = self.paginate_queryset(products)
        
        if page is not None:
            serializer = ProductListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)


class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Collection.objects.filter(is_enabled=True).order_by('id')
    serializer_class = CollectionSerializer
    
    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        collection = self.get_object()
        products = Product.objects.filter(collections=collection, is_enabled=True).order_by('id')
        page = self.paginate_queryset(products)
        
        if page is not None:
            serializer = ProductListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)