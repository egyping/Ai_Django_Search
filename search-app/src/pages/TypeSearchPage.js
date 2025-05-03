// src/pages/TypeSearchPage.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import BrandCard from '../components/BrandCard';
import CollectionCard from '../components/CollectionCard';
import SearchBar from '../components/SearchBar';

// Helper function to parse query params
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TypeSearchPage = () => {
  const { type } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get('q') || '';
  
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  
  // Validate type and get display name
  const validTypes = ['products', 'brands', 'collections'];
  const typeDisplayName = {
    products: 'Products',
    brands: 'Brands',
    collections: 'Collections'
  }[type] || 'Items';
  
  // Handle search form submission
  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') return;
    navigate(`/search/${type}?q=${encodeURIComponent(newQuery)}`);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Fetch search results when query param or type changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery || !validTypes.includes(type)) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        console.log(`Searching for "${searchQuery}" in ${type}`);
        
        // Get search results from main search endpoint
        const results = await api.searchProducts(searchQuery);
        console.log('Search results:', results);
        
        // Extract the relevant results based on type
        if (type === 'products' && results.products) {
          const productsData = results.products.results || [];
          setSearchResults(productsData);
          setTotalCount(productsData.length);
        } else if (type === 'brands' && results.brands) {
          setSearchResults(results.brands);
          setTotalCount(results.brands.length);
        } else if (type === 'collections' && results.collections) {
          setSearchResults(results.collections);
          setTotalCount(results.collections.length);
        } else {
          setSearchResults([]);
          setTotalCount(0);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error searching by type:', err);
        setError(err.message || 'Failed to perform search');
        setSearchResults([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [type, searchQuery]);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(searchResults) 
    ? searchResults.slice(indexOfFirstItem, indexOfLastItem) 
    : [];
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Render appropriate card component based on type
  const renderCard = (item) => {
    switch(type) {
      case 'products':
        return <ProductCard product={item} />;
      case 'brands':
        return <BrandCard brand={item} />;
      case 'collections':
        return <CollectionCard collection={item} />;
      default:
        return null;
    }
  };
  
  if (!validTypes.includes(type)) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Invalid type: {type}. Valid types are: products, brands, collections.
        </div>
        <Link to="/search" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }
  
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
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">{typeDisplayName}</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
        </div>
      </div>
      
      {searchQuery && (
        <div className="mb-4">
          <h5>Results for: "{searchQuery}" in {typeDisplayName}</h5>
          <p>Found {totalCount} {typeDisplayName.toLowerCase()}</p>
          
          {error && (
            <div className="alert alert-danger">
              Error: {error}
            </div>
          )}
          
          {!isLoading && currentItems.length === 0 && (
            <div className="alert alert-info">
              No {typeDisplayName.toLowerCase()} found. Try a different search term.
            </div>
          )}
        </div>
      )}
      
      {currentItems.length > 0 && (
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
          {currentItems.map(item => (
            <div className="col" key={item.id}>
              {renderCard(item)}
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalCount > itemsPerPage && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            
            {Array.from({ length: Math.ceil(totalCount / itemsPerPage) }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${currentPage === Math.ceil(totalCount / itemsPerPage) ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalCount / itemsPerPage)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
      
      <div className="mt-4">
        <Link to="/search" className="btn btn-secondary">Back to Main Search</Link>
      </div>
    </div>
  );
};

export default TypeSearchPage;