import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CollectionCard from '../components/CollectionCard';
import SearchBar from '../components/SearchBar';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const data = await api.getCollections();
        
        // Ensure data is an array
        const collectionsArray = Array.isArray(data) ? data : [];
        setCollections(collectionsArray);
        setFilteredCollections(collectionsArray);
        setError(null);
      } catch (err) {
        console.error('Error in fetchCollections:', err);
        setError(err);
        setCollections([]);
        setFilteredCollections([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredCollections(collections);
      return;
    }

    try {
      const results = await api.searchCollections(query);
      // Ensure collections is an array
      const collectionsArray = results && results.collections && Array.isArray(results.collections) 
        ? results.collections 
        : [];
      setFilteredCollections(collectionsArray);
    } catch (err) {
      console.error('Error in handleSearch:', err);
      setError(err);
      setFilteredCollections([]);
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
          Error loading collections: {error.message || 'Unknown error'}
        </div>
        <Link to="/" className="btn btn-primary">Go Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Collections</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {searchQuery && (
        <div className="mb-3">
          <h5>Search results for: "{searchQuery}"</h5>
          {filteredCollections.length === 0 && (
            <div className="alert alert-info">No collections found. Try a different search term.</div>
          )}
        </div>
      )}

      {filteredCollections.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredCollections.map(collection => (
            <div className="col" key={collection.id || 'unknown'}>
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      ) : (
        !searchQuery && (
          <div className="alert alert-info">
            No collections available.
          </div>
        )
      )}
    </div>
  );
};

export default CollectionsPage;