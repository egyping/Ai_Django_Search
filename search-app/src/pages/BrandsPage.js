import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BrandCard from '../components/BrandCard';
import SearchBar from '../components/SearchBar';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const data = await api.getBrands();
        
        // Ensure data is an array
        const brandsArray = Array.isArray(data) ? data : [];
        setBrands(brandsArray);
        setFilteredBrands(brandsArray);
        setError(null);
      } catch (err) {
        console.error('Error in fetchBrands:', err);
        setError(err);
        setBrands([]);
        setFilteredBrands([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBrands(brands);
      return;
    }

    try {
      const results = await api.searchBrands(query);
      // Ensure brands is an array
      const brandsArray = results && results.brands && Array.isArray(results.brands) 
        ? results.brands 
        : [];
      setFilteredBrands(brandsArray);
    } catch (err) {
      console.error('Error in handleSearch:', err);
      setError(err);
      setFilteredBrands([]);
    }
  };

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
          Error loading brands: {error.message || 'Unknown error'}
        </div>
        <Link to="/" className="btn btn-primary">Go Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Brands</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {searchQuery && (
        <div className="mb-3">
          <h5>Search results for: "{searchQuery}"</h5>
          {filteredBrands.length === 0 && (
            <div className="alert alert-info">No brands found. Try a different search term.</div>
          )}
        </div>
      )}

      {filteredBrands.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredBrands.map(brand => (
            <div className="col" key={brand.id || 'unknown'}>
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>
      ) : (
        !searchQuery && (
          <div className="alert alert-info">
            No brands available.
          </div>
        )
      )}
    </div>
  );
};

export default BrandsPage;