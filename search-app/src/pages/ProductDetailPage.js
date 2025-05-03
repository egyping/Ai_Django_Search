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

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name} 
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
          <h1 className="mb-3">{product.name}</h1>
          
          {product.brand && (
            <p className="mb-2">
              <strong>Brand:</strong> <Link to={`/brands/${product.brand.id}`}>{product.brand.name}</Link>
            </p>
          )}
          
          {product.collection && (
            <p className="mb-2">
              <strong>Collection:</strong> <Link to={`/collections/${product.collection.id}`}>{product.collection.name}</Link>
            </p>
          )}
          
          {product.price && (
            <p className="fs-3 fw-bold text-primary">${product.price.toFixed(2)}</p>
          )}
          
          {product.description && (
            <div className="mb-4">
              <h5>Description</h5>
              <p>{product.description}</p>
            </div>
          )}
          
          {product.specifications && (
            <div className="mb-4">
              <h5>Specifications</h5>
              <ul className="list-group">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;