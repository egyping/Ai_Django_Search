import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import BrandCard from '../components/BrandCard';
import CollectionCard from '../components/CollectionCard';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredBrands, setFeaturedBrands] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get data with safeguards
        let brandsData = [];
        let collectionsData = [];
        let productsData = [];
        
        try {
          const brandsResponse = await api.getBrands();
          brandsData = Array.isArray(brandsResponse) ? brandsResponse : [];
        } catch (err) {
          console.error('Error fetching brands:', err);
        }
        
        try {
          const collectionsResponse = await api.getCollections();
          collectionsData = Array.isArray(collectionsResponse) ? collectionsResponse : [];
        } catch (err) {
          console.error('Error fetching collections:', err);
        }
        
        try {
          const productsResponse = await api.getProducts();
          productsData = Array.isArray(productsResponse) ? productsResponse : [];
        } catch (err) {
          console.error('Error fetching products:', err);
        }
        
        // Take first 3 items from each category
        setFeaturedBrands(brandsData.slice(0, 3));
        setFeaturedCollections(collectionsData.slice(0, 3));
        setFeaturedProducts(productsData.slice(0, 6));
        setError(null);
      } catch (err) {
        setError(err);
        setFeaturedBrands([]);
        setFeaturedCollections([]);
        setFeaturedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
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
      <div className="alert alert-danger my-3" role="alert">
        Error loading content: {error.message}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-8 mx-auto text-center">
          <h1 className="display-4 mb-3">Welcome to our Product Search</h1>
          <p className="lead mb-4">Search for your favorite products, brands, and collections</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Featured Brands */}
      {featuredBrands.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Featured Brands</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {featuredBrands.map(brand => (
              <div className="col" key={brand.id || 'unknown'}>
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a href="/brands" className="btn btn-outline-primary">View All Brands</a>
          </div>
        </div>
      )}

      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Featured Collections</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {featuredCollections.map(collection => (
              <div className="col" key={collection.id || 'unknown'}>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a href="/collections" className="btn btn-outline-primary">View All Collections</a>
          </div>
        </div>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Featured Products</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {featuredProducts.map(product => (
              <div className="col" key={product.id || 'unknown'}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a href="/products" className="btn btn-outline-primary">View All Products</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;