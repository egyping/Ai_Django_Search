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

  return (
    <div className="card h-100">
      {product.image_url && (
        <img 
          src={product.image_url} 
          className="card-img-top" 
          alt={product.name || 'Product'}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{product.name || 'Unnamed Product'}</h5>
        {product.description && (
          <p className="card-text text-truncate">{product.description}</p>
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