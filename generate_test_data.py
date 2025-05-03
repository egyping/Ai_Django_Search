import os
import django
import random
from django.core.files.uploadedfile import SimpleUploadedFile
from pathlib import Path
from django.conf import settings
import base64
from io import BytesIO
from PIL import Image

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from catalog.models import Brand, Collection, Product

# Create a directory for media files if it doesn't exist
os.makedirs(os.path.join(settings.BASE_DIR, 'media', 'products'), exist_ok=True)

def generate_dummy_image(width=800, height=600, name="test_image.jpg"):
    """Generate a dummy image for testing"""
    image = Image.new('RGB', (width, height), color=(73, 109, 137))
    stream = BytesIO()
    image.save(stream, format='JPEG')
    stream.seek(0)
    return SimpleUploadedFile(name, stream.read(), content_type="image/jpeg")

def create_test_brands():
    """Create 6 test brands"""
    brands = [
        {
            'title_en': 'Apple',
            'title_ar': 'آبل',
            'description_en': 'A leading technology company that designs and manufactures smartphones, tablets, and computers.',
            'description_ar': 'شركة تكنولوجيا رائدة تصمم وتصنع الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر.'
        },
        {
            'title_en': 'Samsung',
            'title_ar': 'سامسونج',
            'description_en': 'A global technology company that produces electronics, appliances, and mobile devices.',
            'description_ar': 'شركة تكنولوجيا عالمية تنتج الإلكترونيات والأجهزة المنزلية والأجهزة المحمولة.'
        },
        {
            'title_en': 'Nike',
            'title_ar': 'نايكي',
            'description_en': 'A world-renowned sportswear brand known for athletic footwear, apparel, and accessories.',
            'description_ar': 'علامة تجارية عالمية للملابس الرياضية معروفة بالأحذية الرياضية والملابس والإكسسوارات.'
        },
        {
            'title_en': 'Adidas',
            'title_ar': 'أديداس',
            'description_en': 'A popular sportswear manufacturer offering high-quality athletic clothing and footwear.',
            'description_ar': 'شركة مصنعة للملابس الرياضية الشهيرة تقدم ملابس وأحذية رياضية عالية الجودة.'
        },
        {
            'title_en': 'Sony',
            'title_ar': 'سوني',
            'description_en': 'A multinational conglomerate known for electronics, gaming, entertainment, and financial services.',
            'description_ar': 'شركة متعددة الجنسيات معروفة بالإلكترونيات والألعاب والترفيه والخدمات المالية.'
        },
        {
            'title_en': 'Zara',
            'title_ar': 'زارا',
            'description_en': 'A leading fashion retailer offering trendy clothing and accessories for men, women, and children.',
            'description_ar': 'متجر أزياء رائد يقدم ملابس وإكسسوارات عصرية للرجال والنساء والأطفال.'
        }
    ]
    
    created_brands = []
    for brand_data in brands:
        brand, created = Brand.objects.get_or_create(
            title_en=brand_data['title_en'],
            defaults={
                'title_ar': brand_data['title_ar'],
                'description_en': brand_data['description_en'],
                'description_ar': brand_data['description_ar'],
                'is_enabled': True
            }
        )
        created_brands.append(brand)
        print(f"Created brand: {brand.title_en}")
    
    return created_brands

def create_test_collections():
    """Create 6 test collections"""
    collections = [
        {
            'title_en': 'Summer Collection',
            'title_ar': 'مجموعة الصيف',
            'description_en': 'Lightweight and breathable items perfect for hot summer days.',
            'description_ar': 'عناصر خفيفة الوزن تسمح بمرور الهواء مثالية لأيام الصيف الحارة.'
        },
        {
            'title_en': 'Winter Essentials',
            'title_ar': 'أساسيات الشتاء',
            'description_en': 'Warm and cozy items to keep you comfortable during cold winter months.',
            'description_ar': 'عناصر دافئة ومريحة للحفاظ على راحتك خلال أشهر الشتاء الباردة.'
        },
        {
            'title_en': 'Smart Devices',
            'title_ar': 'الأجهزة الذكية',
            'description_en': 'The latest smart devices to enhance your digital lifestyle.',
            'description_ar': 'أحدث الأجهزة الذكية لتعزيز نمط حياتك الرقمي.'
        },
        {
            'title_en': 'Gaming Gear',
            'title_ar': 'معدات الألعاب',
            'description_en': 'High-performance equipment for the ultimate gaming experience.',
            'description_ar': 'معدات عالية الأداء لتجربة الألعاب المثالية.'
        },
        {
            'title_en': 'Casual Wear',
            'title_ar': 'ملابس غير رسمية',
            'description_en': 'Comfortable and stylish everyday clothing for all occasions.',
            'description_ar': 'ملابس يومية مريحة وأنيقة لجميع المناسبات.'
        },
        {
            'title_en': 'Sports Equipment',
            'title_ar': 'معدات رياضية',
            'description_en': 'High-quality gear for various sports and outdoor activities.',
            'description_ar': 'معدات عالية الجودة لمختلف الرياضات والأنشطة الخارجية.'
        }
    ]
    
    created_collections = []
    for collection_data in collections:
        collection, created = Collection.objects.get_or_create(
            title_en=collection_data['title_en'],
            defaults={
                'title_ar': collection_data['title_ar'],
                'description_en': collection_data['description_en'],
                'description_ar': collection_data['description_ar'],
                'is_enabled': True
            }
        )
        created_collections.append(collection)
        print(f"Created collection: {collection.title_en}")
    
    return created_collections

def create_test_products(brands, collections):
    """Create 30 test products"""
    products = [
        # Apparel Products (15)
        {
            'title_en': 'Men\'s Cotton T-Shirt',
            'title_ar': 'تي شيرت قطني للرجال',
            'description_en': 'Comfortable 100% cotton t-shirt suitable for everyday wear.',
            'description_ar': 'تي شيرت قطني مريح 100٪ مناسب للارتداء اليومي.',
            'price': 19.99,
            'quantity': 100,
            'category': 'apparel',
            'brand_index': 2  # Nike
        },
        {
            'title_en': 'Women\'s Running Shorts',
            'title_ar': 'شورت جري للنساء',
            'description_en': 'Lightweight shorts with built-in liner for comfortable running.',
            'description_ar': 'شورت خفيف مع بطانة مدمجة للجري المريح.',
            'price': 24.99,
            'quantity': 75,
            'category': 'apparel',
            'brand_index': 3  # Adidas
        },
        {
            'title_en': 'Kids Sports Jersey',
            'title_ar': 'قميص رياضي للأطفال',
            'description_en': 'Breathable sports jersey for kids perfect for team sports.',
            'description_ar': 'قميص رياضي يسمح بمرور الهواء للأطفال مثالي للرياضات الجماعية.',
            'price': 14.99,
            'quantity': 120,
            'category': 'apparel',
            'brand_index': 2  # Nike
        },
        {
            'title_en': 'Men\'s Slim Fit Jeans',
            'title_ar': 'جينز سليم فيت للرجال',
            'description_en': 'Stylish slim fit jeans made with premium denim fabric.',
            'description_ar': 'جينز سليم فيت أنيق مصنوع من قماش الدنيم الممتاز.',
            'price': 49.99,
            'quantity': 85,
            'category': 'apparel',
            'brand_index': 5  # Zara
        },
        {
            'title_en': 'Women\'s Summer Dress',
            'title_ar': 'فستان صيفي للنساء',
            'description_en': 'Light and flowy summer dress perfect for warm weather.',
            'description_ar': 'فستان صيفي خفيف ومتدفق مثالي للطقس الدافئ.',
            'price': 39.99,
            'quantity': 60,
            'category': 'apparel',
            'brand_index': 5  # Zara
        },
        {
            'title_en': 'Unisex Hooded Sweatshirt',
            'title_ar': 'سويت شيرت بغطاء رأس للجنسين',
            'description_en': 'Cozy hooded sweatshirt suitable for all genders and seasons.',
            'description_ar': 'سويت شيرت مريح بغطاء رأس مناسب لجميع الأجناس والمواسم.',
            'price': 34.99,
            'quantity': 90,
            'category': 'apparel',
            'brand_index': 3  # Adidas
        },
        {
            'title_en': 'Men\'s Formal Shirt',
            'title_ar': 'قميص رسمي للرجال',
            'description_en': 'Classic formal shirt for professional settings and special occasions.',
            'description_ar': 'قميص رسمي كلاسيكي للأماكن المهنية والمناسبات الخاصة.',
            'price': 59.99,
            'quantity': 70,
            'category': 'apparel',
            'brand_index': 5  # Zara
        },
        {
            'title_en': 'Women\'s Athletic Leggings',
            'title_ar': 'ليجنز رياضي للنساء',
            'description_en': 'Stretchy and comfortable leggings for workouts and active lifestyles.',
            'description_ar': 'ليجنز مطاطي ومريح للتمارين وأنماط الحياة النشطة.',
            'price': 29.99,
            'quantity': 110,
            'category': 'apparel',
            'brand_index': 2  # Nike
        },
        {
            'title_en': 'Kids Winter Jacket',
            'title_ar': 'جاكيت شتوي للأطفال',
            'description_en': 'Warm and water-resistant jacket to keep children comfortable in cold weather.',
            'description_ar': 'جاكيت دافئ ومقاوم للماء للحفاظ على راحة الأطفال في الطقس البارد.',
            'price': 64.99,
            'quantity': 55,
            'category': 'apparel',
            'brand_index': 3  # Adidas
        },
        {
            'title_en': 'Men\'s Running Shoes',
            'title_ar': 'أحذية جري للرجال',
            'description_en': 'Lightweight and supportive running shoes with cushioned soles.',
            'description_ar': 'أحذية جري خفيفة وداعمة مع نعال مبطنة.',
            'price': 89.99,
            'quantity': 65,
            'category': 'apparel',
            'brand_index': 2  # Nike
        },
        {
            'title_en': 'Women\'s Casual Sneakers',
            'title_ar': 'أحذية رياضية غير رسمية للنساء',
            'description_en': 'Versatile sneakers that combine style and comfort for everyday use.',
            'description_ar': 'أحذية رياضية متعددة الاستخدامات تجمع بين الأناقة والراحة للاستخدام اليومي.',
            'price': 74.99,
            'quantity': 80,
            'category': 'apparel',
            'brand_index': 3  # Adidas
        },
        {
            'title_en': 'Unisex Baseball Cap',
            'title_ar': 'قبعة بيسبول للجنسين',
            'description_en': 'Classic baseball cap with adjustable strap for perfect fit.',
            'description_ar': 'قبعة بيسبول كلاسيكية مع حزام قابل للتعديل للمقاس المثالي.',
            'price': 19.99,
            'quantity': 150,
            'category': 'apparel',
            'brand_index': 2  # Nike
        },
        {
            'title_en': 'Men\'s Swimming Trunks',
            'title_ar': 'سروال سباحة للرجال',
            'description_en': 'Quick-drying swimming trunks perfect for beach or pool.',
            'description_ar': 'سروال سباحة سريع الجفاف مثالي للشاطئ أو حمام السباحة.',
            'price': 29.99,
            'quantity': 90,
            'category': 'apparel',
            'brand_index': 3  # Adidas
        },
        {
            'title_en': 'Women\'s Yoga Pants',
            'title_ar': 'بنطلون يوغا للنساء',
            'description_en': 'Stretchy and comfortable yoga pants for fitness and relaxation.',
            'description_ar': 'بنطلون يوغا مطاطي ومريح للياقة البدنية والاسترخاء.',
            'price': 44.99,
            'quantity': 75,
            'category': 'apparel',
            'brand_index': 5  # Zara
        },
        {
            'title_en': 'Kids Graphic T-Shirt',
            'title_ar': 'تي شيرت برسومات للأطفال',
            'description_en': 'Fun and colorful graphic t-shirt designed for children.',
            'description_ar': 'تي شيرت ممتع وملون بالرسومات مصمم للأطفال.',
            'price': 14.99,
            'quantity': 130,
            'category': 'apparel',
            'brand_index': 5  # Zara
        },
        
        # Electronics Products (15)
        {
            'title_en': 'Smartphone Pro Max',
            'title_ar': 'الهاتف الذكي برو ماكس',
            'description_en': 'Latest flagship smartphone with advanced camera and powerful processor.',
            'description_ar': 'أحدث هاتف ذكي رائد مع كاميرا متطورة ومعالج قوي.',
            'price': 999.99,
            'quantity': 40,
            'category': 'electronics',
            'brand_index': 0  # Apple
        },
        {
            'title_en': 'Ultra HD Smart TV',
            'title_ar': 'تلفزيون ذكي فائق الدقة',
            'description_en': '55-inch smart TV with ultra high definition display and smart features.',
            'description_ar': 'تلفزيون ذكي 55 بوصة مع شاشة فائقة الدقة وميزات ذكية.',
            'price': 799.99,
            'quantity': 25,
            'category': 'electronics',
            'brand_index': 1  # Samsung
        },
        {
            'title_en': 'Noise Cancelling Headphones',
            'title_ar': 'سماعات إلغاء الضوضاء',
            'description_en': 'Wireless headphones with advanced noise cancellation technology.',
            'description_ar': 'سماعات لاسلكية مع تقنية متقدمة لإلغاء الضوضاء.',
            'price': 249.99,
            'quantity': 60,
            'category': 'electronics',
            'brand_index': 4  # Sony
        },
        {
            'title_en': 'Tablet Pro',
            'title_ar': 'تابلت برو',
            'description_en': 'Powerful tablet with high-resolution display and long battery life.',
            'description_ar': 'تابلت قوي مع شاشة عالية الدقة وعمر بطارية طويل.',
            'price': 699.99,
            'quantity': 35,
            'category': 'electronics',
            'brand_index': 0  # Apple
        },
        {
            'title_en': 'Wireless Earbuds',
            'title_ar': 'سماعات أذن لاسلكية',
            'description_en': 'Compact wireless earbuds with excellent sound quality and comfortable fit.',
            'description_ar': 'سماعات أذن لاسلكية مدمجة مع جودة صوت ممتازة وتناسب مريح.',
            'price': 149.99,
            'quantity': 80,
            'category': 'electronics',
            'brand_index': 1  # Samsung
        },
        {
            'title_en': 'Smart Watch Series 5',
            'title_ar': 'ساعة ذكية سلسلة 5',
            'description_en': 'Advanced smartwatch with health monitoring and connectivity features.',
            'description_ar': 'ساعة ذكية متقدمة مع ميزات مراقبة الصحة والاتصال.',
            'price': 399.99,
            'quantity': 50,
            'category': 'electronics',
            'brand_index': 0  # Apple
        },
        {
            'title_en': 'Bluetooth Speaker',
            'title_ar': 'مكبر صوت بلوتوث',
            'description_en': 'Portable bluetooth speaker with waterproof design and powerful sound.',
            'description_ar': 'مكبر صوت بلوتوث محمول مع تصميم مقاوم للماء وصوت قوي.',
            'price': 129.99,
            'quantity': 70,
            'category': 'electronics',
            'brand_index': 4  # Sony
        },
        {
            'title_en': 'Digital Camera',
            'title_ar': 'كاميرا رقمية',
            'description_en': 'High-performance digital camera with 4K video recording capabilities.',
            'description_ar': 'كاميرا رقمية عالية الأداء مع إمكانيات تسجيل فيديو بدقة 4K.',
            'price': 599.99,
            'quantity': 30,
            'category': 'electronics',
            'brand_index': 4  # Sony
        },
        {
            'title_en': 'Gaming Laptop',
            'title_ar': 'لابتوب للألعاب',
            'description_en': 'Powerful gaming laptop with high-refresh display and dedicated graphics.',
            'description_ar': 'لابتوب قوي للألعاب مع شاشة عالية التحديث ورسومات مخصصة.',
            'price': 1499.99,
            'quantity': 20,
            'category': 'electronics',
            'brand_index': 1  # Samsung
        },
        {
            'title_en': 'Wireless Mouse',
            'title_ar': 'ماوس لاسلكي',
            'description_en': 'Ergonomic wireless mouse with adjustable DPI and long battery life.',
            'description_ar': 'ماوس لاسلكي مريح مع دقة قابلة للتعديل وعمر بطارية طويل.',
            'price': 49.99,
            'quantity': 100,
            'category': 'electronics',
            'brand_index': 4  # Sony
        },
        {
            'title_en': 'Home Theater System',
            'title_ar': 'نظام مسرح منزلي',
            'description_en': 'Complete home theater system with surround sound and 4K support.',
            'description_ar': 'نظام مسرح منزلي كامل مع صوت محيطي ودعم لدقة 4K.',
            'price': 799.99,
            'quantity': 15,
            'category': 'electronics',
            'brand_index': 4  # Sony
        },
        {
            'title_en': 'Smart Home Hub',
            'title_ar': 'مركز المنزل الذكي',
            'description_en': 'Central hub for controlling all your smart home devices in one place.',
            'description_ar': 'مركز مركزي للتحكم في جميع أجهزة منزلك الذكية في مكان واحد.',
            'price': 129.99,
            'quantity': 45,
            'category': 'electronics',
            'brand_index': 1  # Samsung
        },
        {
            'title_en': 'External SSD',
            'title_ar': 'قرص SSD خارجي',
            'description_en': 'Fast and portable external SSD for secure data storage and quick transfers.',
            'description_ar': 'قرص SSD خارجي سريع ومحمول لتخزين البيانات بشكل آمن ونقلها بسرعة.',
            'price': 159.99,
            'quantity': 55,
            'category': 'electronics',
            'brand_index': 1  # Samsung
        },
        {
            'title_en': 'Wireless Charger',
            'title_ar': 'شاحن لاسلكي',
            'description_en': 'Fast wireless charging pad compatible with various devices.',
            'description_ar': 'وسادة شحن لاسلكية سريعة متوافقة مع أجهزة متنوعة.',
            'price': 39.99,
            'quantity': 90,
            'category': 'electronics',
            'brand_index': 0  # Apple
        },
        {
            'title_en': 'Fitness Tracker',
            'title_ar': 'جهاز تتبع اللياقة البدنية',
            'description_en': 'Slim fitness band that monitors activity, sleep, and heart rate.',
            'description_ar': 'سوار لياقة بدنية نحيف يراقب النشاط والنوم ومعدل ضربات القلب.',
            'price': 89.99,
            'quantity': 75,
            'category': 'electronics',
            'brand_index': 1  # Samsung
        }
    ]
    
    created_products = []
    for product_data in products:
        brand = brands[product_data['brand_index']]
        
        # Create dummy image
        image = generate_dummy_image(name=f"{product_data['title_en'].replace(' ', '_').lower()}.jpg")
        
        product, created = Product.objects.get_or_create(
            title_en=product_data['title_en'],
            defaults={
                'title_ar': product_data['title_ar'],
                'description_en': product_data['description_en'],
                'description_ar': product_data['description_ar'],
                'price': product_data['price'],
                'quantity': product_data['quantity'],
                'is_enabled': True,
                'category': product_data['category'],
                'image': image,
                'brand': brand
            }
        )
        
        # Add random collections (1-3) to each product
        if created:
            num_collections = random.randint(1, 3)
            selected_collections = random.sample(collections, num_collections)
            product.collections.set(selected_collections)
            
            collection_names = [c.title_en for c in selected_collections]
            print(f"Created product: {product.title_en} (Brand: {brand.title_en}, Collections: {', '.join(collection_names)})")
            
        created_products.append(product)
    
    return created_products

if __name__ == "__main__":
    print("Generating test data...")
    print("\nCreating brands...")
    brands = create_test_brands()
    
    print("\nCreating collections...")
    collections = create_test_collections()
    
    print("\nCreating products...")
    products = create_test_products(brands, collections)
    
    print("\nTest data generation complete!")
    print(f"Created {len(brands)} brands, {len(collections)} collections, and {len(products)} products.")