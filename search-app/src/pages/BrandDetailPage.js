import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const BrandDetailPage = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandAndProducts = async () => {
      try {
        setIsLoading(true);
        const [brandData, productsData] = await Promise.all([
          api.getBrand(id),
          api.getProductsByBrand(id)
        ]);
        setBrand(brandData);
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrandAndProducts();
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
          Error loading brand: {error.message}
        </div>
        <Link to="/" className="btn btn-primary">Go Back to Home</Link>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Brand not found
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
          <li className="breadcrumb-item"><Link to="/brands">Brands</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{brand.name}</li>
        </ol>
      </nav>

      <div className="row mb-5">
        <div className="col">
          <h1 className="mb-3">{brand.name}</h1>
          
          {brand.logo_url && (
            <img 
              src={brand.logo_url} 
              alt={`${brand.name} logo`} 
              className="mb-3" 
              style={{ maxHeight: '100px' }}
            />
          )}
          
          {brand.description && (
            <div className="mb-3">
              <p>{brand.description}</p>
            </div>
          )}
          
          {brand.website && (
            <div className="mb-3">
              <a href={brand.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                Visit Brand Website
              </a>
            </div>
          )}
        </div>
      </div>

      <h2 className="mb-4">Products by {brand.name}</h2>
      
      {products.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map(product => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          No products available for this brand.
        </div>
      )}
    </div>
  );
};

export default BrandDetailPage;