import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CollectionCard from '../components/CollectionCard';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const data = await api.getCollections();
        console.log('Collections API response:', data); // Debug log
        
        // Check if data is an array or has a results property
        const collectionsArray = Array.isArray(data) 
          ? data 
          : (data.results || []);
          
        console.log('Processed collections array:', collectionsArray); // Debug log
        setCollections(collectionsArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError(err.message || 'Failed to load collections');
        setCollections([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
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
          Error loading collections: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Collections</h1>

      {collections.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {collections.map(collection => (
            <div className="col" key={collection.id}>
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          No collections available.
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;