from django.contrib import admin
from .models import Product, Collection, Brand

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'is_enabled', 'created_at')
    list_filter = ('is_enabled',)
    search_fields = ('title_en', 'title_ar', 'description_en', 'description_ar')
    prepopulated_fields = {'slug': ('title_en',)}
    list_editable = ('is_enabled',)
    fieldsets = (
        (None, {
            'fields': ('slug', 'is_enabled')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en')
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar')
        }),
    )


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'is_enabled', 'created_at')
    list_filter = ('is_enabled',)
    search_fields = ('title_en', 'title_ar', 'description_en', 'description_ar')
    prepopulated_fields = {'slug': ('title_en',)}
    list_editable = ('is_enabled',)
    fieldsets = (
        (None, {
            'fields': ('slug', 'is_enabled')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en')
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar')
        }),
    )


class ProductCollectionInline(admin.TabularInline):
    model = Product.collections.through
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_ar', 'brand', 'price', 'quantity', 'is_enabled', 'created_at')
    list_filter = ('is_enabled', 'brand', 'category', 'collections')
    search_fields = ('title_en', 'title_ar', 'description_en', 'description_ar')
    prepopulated_fields = {'slug': ('title_en',)}
    list_editable = ('price', 'quantity', 'is_enabled')
    inlines = [ProductCollectionInline]
    exclude = ('collections',)
    fieldsets = (
        (None, {
            'fields': ('slug', 'brand', 'price', 'quantity', 'is_enabled', 'category', 'image')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en')
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar')
        }),
    )