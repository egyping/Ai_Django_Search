import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BrandCard from '../components/BrandCard';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const data = await api.getBrands();
        console.log('Brands API response:', data); // Debug log
        
        // Check if data is an array or has a results property
        const brandsArray = Array.isArray(data) 
          ? data 
          : (data.results || []);
          
        console.log('Processed brands array:', brandsArray); // Debug log
        setBrands(brandsArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError(err.message || 'Failed to load brands');
        setBrands([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
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
          Error loading brands: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Brands</h1>

      {brands.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {brands.map(brand => (
            <div className="col" key={brand.id}>
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          No brands available.
        </div>
      )}
    </div>
  );
};

export default BrandsPage;