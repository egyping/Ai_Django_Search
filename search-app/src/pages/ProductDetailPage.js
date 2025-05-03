import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await api.getProduct(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Error loading product: {error.message}
        </div>
        <Link to="/" className="btn btn-primary">Go Back to Home</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Product not found
        </div>
        <Link to="/" className="btn btn-primary">Go Back to Home</Link>
      </div>
    );
  }

  // Field name corrections based on Django model
  const productTitle = product.title_en || product.name || '';
  const productDescription = product.description_en || product.description || '';
  
  // Handle price safely
  const formatPrice = (price) => {
    // Check if price exists and is a number or can be converted to a number
    if (price !== undefined && price !== null) {
      // Convert to number if it's a string
      const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
      // Check if conversion was successful
      if (!isNaN(numericPrice)) {
        return numericPrice.toFixed(2);
      }
    }
    // Default case if price is invalid
    return '0.00';
  };

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{productTitle}</li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-6">
          {product.image ? (
            <img
              src={product.image}
              alt={productTitle}
              className="img-fluid rounded"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          ) : (
            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
              <p className="text-muted">No image available</p>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{productTitle}</h1>
          {product.brand && (
            <p className="mb-2">
              <strong>Brand:</strong> <Link to={`/brands/${product.brand.id}`}>{product.brand.title_en || product.brand.name}</Link>
            </p>
          )}
          {product.collections && product.collections.length > 0 && (
            <p className="mb-2">
              <strong>Collections:</strong> {product.collections.map((collection, index) => (
                <span key={collection.id}>
                  <Link to={`/collections/${collection.id}`}>{collection.title_en || collection.name}</Link>
                  {index < product.collections.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
          <p className="fs-3 fw-bold text-primary">${formatPrice(product.price)}</p>
          {productDescription && (
            <div className="mb-4">
              <h5>Description</h5>
              <p>{productDescription}</p>
            </div>
          )}
          {product.category && (
            <div className="mb-4">
              <h5>Category</h5>
              <p>{product.category}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;