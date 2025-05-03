// src/pages/ProductsPage.js (updated version)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await api.getProducts();
        console.log('Products API response:', data); // Debug log
        
        // Check if data is an array or has a results property
        const productsArray = Array.isArray(data) 
          ? data 
          : (data.results || []);
          
        console.log('Processed products array:', productsArray); // Debug log
        setProducts(productsArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Products</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar onSearch={(query) => console.log('Search:', query)} />
        </div>
      </div>

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
          No products available.
        </div>
      )}
    </div>
  );
};

export default ProductsPage;