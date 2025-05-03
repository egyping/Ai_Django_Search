from rest_framework import serializers
from .models import Product, Brand, Collection


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'title_en', 'title_ar', 'description_en', 'description_ar', 
                 'is_enabled', 'slug', 'created_at', 'updated_at']


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'title_en', 'title_ar', 'description_en', 'description_ar',
                 'is_enabled', 'slug', 'created_at', 'updated_at']


class ProductListSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    collections = CollectionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'title_en', 'title_ar', 'price', 'is_enabled', 'category',
                 'image', 'brand', 'collections', 'slug', 'created_at']


class ProductDetailSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    collections = CollectionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'title_en', 'title_ar', 'description_en', 'description_ar',
                 'price', 'quantity', 'is_enabled', 'category', 'image', 'brand',
                 'collections', 'slug', 'created_at', 'updated_at']