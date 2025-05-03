import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import BrandCard from '../components/BrandCard';
import CollectionCard from '../components/CollectionCard';
import SearchBar from '../components/SearchBar';

// Helper function to parse query params
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get('q') || '';
  
  const [searchResults, setSearchResults] = useState({
    products: [],
    brands: [],
    collections: [],
    total_results: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle search form submission
  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') return;
    console.log('Search submitted:', newQuery);
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };
  
  // Fetch search results when query param changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        return;
      }
      
      try {
        setIsLoading(true);
        console.log('Searching for:', searchQuery);
        const results = await api.searchProducts(searchQuery);
        console.log('Search API full response:', results); // Debug log
        
        // Extract all sections of the response carefully
        let products = [];
        let brands = [];
        let collections = [];
        
        // Handle products which might be nested in a results property
        if (results.products) {
          if (results.products.results) {
            products = results.products.results;
          } else if (Array.isArray(results.products)) {
            products = results.products;
          }
        }
        
        // Handle brands
        if (Array.isArray(results.brands)) {
          brands = results.brands;
        }
        
        // Handle collections
        if (Array.isArray(results.collections)) {
          collections = results.collections;
        }
        
        console.log('Extracted products:', products);
        console.log('Extracted brands:', brands);
        console.log('Extracted collections:', collections);
        
        setSearchResults({
          products: products,
          brands: brands,
          collections: collections,
          total_results: products.length + brands.length + collections.length
        });
        
        setError(null);
      } catch (err) {
        console.error('Error searching:', err);
        setError(err.message || 'Failed to perform search');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [searchQuery]);
  
  // Debug render
  console.log('SearchPage rendering with:', { 
    searchQuery, 
    productsCount: searchResults.products?.length || 0,
    brandsCount: searchResults.brands?.length || 0,
    collectionsCount: searchResults.collections?.length || 0,
    isLoading,
    error
  });
  
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
  
  // Get data from results with safe access
  const products = searchResults.products || [];
  const brands = searchResults.brands || [];
  const collections = searchResults.collections || [];
  
  const totalProducts = products.length;
  const totalBrands = brands.length;
  const totalCollections = collections.length;
  const totalResults = totalProducts + totalBrands + totalCollections;
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Search Results</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
        </div>
      </div>
      
      {searchQuery && (
        <div className="mb-4">
          <h5>Results for: "{searchQuery}"</h5>
          {totalResults === 0 && !isLoading && (
            <div className="alert alert-info">
              No results found. Try a different search term.
            </div>
          )}
          {error && (
            <div className="alert alert-danger">
              Error performing search: {error}
            </div>
          )}
        </div>
      )}
      
      {/* Products Section */}
      {totalProducts > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Products ({totalProducts})</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map(product => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Brands Section */}
      {totalBrands > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Brands ({totalBrands})</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {brands.map(brand => (
              <div className="col" key={brand.id}>
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Collections Section */}
      {totalCollections > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Collections ({totalCollections})</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {collections.map(collection => (
              <div className="col" key={collection.id}>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!searchQuery && (
        <div className="alert alert-info">
          Enter a search term to find products, brands, and collections.
        </div>
      )}
    </div>
  );
};

export default SearchPage;