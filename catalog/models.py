from django.db import models
from django.utils.text import slugify

class Brand(models.Model):
    title_en = models.CharField(max_length=100)
    title_ar = models.CharField(max_length=100)
    description_en = models.TextField()
    description_ar = models.TextField()
    is_enabled = models.BooleanField(default=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title_en

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title_en)
        super().save(*args, **kwargs)


class Collection(models.Model):
    title_en = models.CharField(max_length=100)
    title_ar = models.CharField(max_length=100)
    description_en = models.TextField()
    description_ar = models.TextField()
    is_enabled = models.BooleanField(default=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title_en
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title_en)
        super().save(*args, **kwargs)


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('apparel', 'Apparel'),
        ('electronics', 'Electronics'),
    ]
    
    title_en = models.CharField(max_length=100)
    title_ar = models.CharField(max_length=100)
    description_en = models.TextField()
    description_ar = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    is_enabled = models.BooleanField(default=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='products/')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    collections = models.ManyToManyField(Collection, related_name='products')
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title_en

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title_en)
        super().save(*args, **kwargs)