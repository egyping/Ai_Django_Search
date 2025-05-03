from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import GenericAPIView
from catalog.models import Product, Brand, Collection
from catalog.serializers import (
    ProductListSerializer,
    BrandSerializer,
    CollectionSerializer
)


class SearchResultsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50


class SearchView(GenericAPIView):
    pagination_class = SearchResultsPagination
    
    def get(self, request):
        query = request.query_params.get('q', '')
        
        if not query:
            return Response({
                "error": "Please provide a search query parameter 'q'"
            }, status=400)
        
        # Get all enabled items with ordering
        products = Product.objects.filter(is_enabled=True).order_by('id')
        brands = Brand.objects.filter(is_enabled=True).order_by('id')
        collections = Collection.objects.filter(is_enabled=True).order_by('id')
        
        # Filter by search query
        products = products.filter(
            Q(title_en__icontains=query) | 
            Q(title_ar__icontains=query) | 
            Q(description_en__icontains=query) | 
            Q(description_ar__icontains=query)
        ).distinct()
        
        brands = brands.filter(
            Q(title_en__icontains=query) | 
            Q(title_ar__icontains=query) | 
            Q(description_en__icontains=query) | 
            Q(description_ar__icontains=query)
        ).distinct()
        
        collections = collections.filter(
            Q(title_en__icontains=query) | 
            Q(title_ar__icontains=query) | 
            Q(description_en__icontains=query) | 
            Q(description_ar__icontains=query)
        ).distinct()
        
        # Apply pagination to each result set
        products_page = self.paginate_queryset(products)
        if products_page is not None:
            product_serializer = ProductListSerializer(products_page, many=True)
            products_data = self.get_paginated_response(product_serializer.data).data
        else:
            product_serializer = ProductListSerializer(products, many=True)
            products_data = product_serializer.data
            
        # For brands and collections, we'll just return all results as they're typically smaller
        brand_serializer = BrandSerializer(brands, many=True)
        collection_serializer = CollectionSerializer(collections, many=True)
        
        # Return the combined results
        return Response({
            'products': products_data,
            'brands': brand_serializer.data,
            'collections': collection_serializer.data,
            'total_results': products.count() + brands.count() + collections.count(),
        })


class SearchCategoryView(GenericAPIView):
    pagination_class = SearchResultsPagination
    
    def get(self, request, category):
        query = request.query_params.get('q', '')
        
        if not query:
            return Response({
                "error": "Please provide a search query parameter 'q'"
            }, status=400)
        
        if category == 'products':
            # Search products
            products = Product.objects.filter(is_enabled=True).filter(
                Q(title_en__icontains=query) | 
                Q(title_ar__icontains=query) | 
                Q(description_en__icontains=query) | 
                Q(description_ar__icontains=query)
            ).distinct().order_by('id')
            
            page = self.paginate_queryset(products)
            if page is not None:
                serializer = ProductListSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
                
            serializer = ProductListSerializer(products, many=True)
            return Response({
                'results': serializer.data,
                'count': products.count(),
            })
            
        elif category == 'brands':
            # Search brands
            brands = Brand.objects.filter(is_enabled=True).filter(
                Q(title_en__icontains=query) | 
                Q(title_ar__icontains=query) | 
                Q(description_en__icontains=query) | 
                Q(description_ar__icontains=query)
            ).distinct().order_by('id')
            
            page = self.paginate_queryset(brands)
            if page is not None:
                serializer = BrandSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
                
            serializer = BrandSerializer(brands, many=True)
            return Response({
                'results': serializer.data,
                'count': brands.count(),
            })
            
        elif category == 'collections':
            # Search collections
            collections = Collection.objects.filter(is_enabled=True).filter(
                Q(title_en__icontains=query) | 
                Q(title_ar__icontains=query) | 
                Q(description_en__icontains=query) | 
                Q(description_ar__icontains=query)
            ).distinct().order_by('id')
            
            page = self.paginate_queryset(collections)
            if page is not None:
                serializer = CollectionSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
                
            serializer = CollectionSerializer(collections, many=True)
            return Response({
                'results': serializer.data,
                'count': collections.count(),
            })
            
        else:
            return Response({
                "error": f"Invalid category: {category}. Must be 'products', 'brands', or 'collections'."
            }, status=400)