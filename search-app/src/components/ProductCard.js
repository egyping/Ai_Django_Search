// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Ensure product exists and has expected properties
  if (!product) {
    return null;
  }

  // Format price safely - convert string to number if needed
  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return 'Price not available';
    }
    // Convert price to number if it's a string
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    // Check if conversion resulted in a valid number
    if (isNaN(numPrice)) {
      return price; // Return original if parsing failed
    }
    // Format with 2 decimal places
    try {
      return `$${numPrice.toFixed(2)}`;
    } catch (e) {
      console.error('Error formatting price:', e);
      return price; // Return original on error
    }
  };

  // Get the product title (English)
  const productTitle = product.title_en || 'Unnamed Product';
  
  // Get the product title (Arabic) if available
  const productTitleAr = product.title_ar;
  
  // Get the brand name if available
  const brandName = product.brand ? product.brand.title_en : null;
  
  // Get collections if available (could be multiple)
  const collections = product.collections || [];

  return (
    <div className="card h-100">
      {product.image && (
        <img
          src={product.image}
          className="card-img-top"
          alt={productTitle}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{productTitle}</h5>
        
        {productTitleAr && (
          <h6 className="card-subtitle mb-2 text-muted">{productTitleAr}</h6>
        )}
        
        {brandName && (
          <div className="mb-2">
            <span className="badge bg-secondary me-1">Brand:</span>
            <Link to={`/brands/${product.brand.id}`} className="text-decoration-none">
              {brandName}
            </Link>
          </div>
        )}
        
        {collections.length > 0 && (
          <div className="mb-2">
            <span className="badge bg-info me-1">Collection{collections.length > 1 ? 's' : ''}:</span>
            {collections.map((collection, index) => (
              <span key={collection.id}>
                <Link to={`/collections/${collection.id}`} className="text-decoration-none">
                  {collection.title_en}
                </Link>
                {index < collections.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
        
        {product.price !== undefined && (
          <p className="card-text fw-bold">{formatPrice(product.price)}</p>
        )}
        
        <Link to={`/products/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;