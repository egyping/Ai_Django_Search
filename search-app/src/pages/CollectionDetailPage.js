import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const CollectionDetailPage = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionAndProducts = async () => {
      try {
        setIsLoading(true);
        const [collectionData, productsData] = await Promise.all([
          api.getCollection(id),
          api.getProductsByCollection(id)
        ]);
        setCollection(collectionData);
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionAndProducts();
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
          Error loading collection: {error.message}
        </div>
        <Link to="/" className="btn btn-primary">Go Back to Home</Link>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Collection not found
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
          <li className="breadcrumb-item"><Link to="/collections">Collections</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{collection.name}</li>
        </ol>
      </nav>

      <div className="row mb-5">
        <div className="col">
          <h1 className="mb-3">{collection.name}</h1>
          
          {collection.image_url && (
            <img 
              src={collection.image_url} 
              alt={collection.name} 
              className="img-fluid rounded mb-3" 
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          )}
          
          {collection.description && (
            <div className="mb-3">
              <p>{collection.description}</p>
            </div>
          )}
          
          {collection.season && (
            <div className="mb-3">
              <p><strong>Season:</strong> {collection.season}</p>
            </div>
          )}
          
          {collection.year && (
            <div className="mb-3">
              <p><strong>Year:</strong> {collection.year}</p>
            </div>
          )}
        </div>
      </div>

      <h2 className="mb-4">Products in {collection.name}</h2>
      
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
          No products available in this collection.
        </div>
      )}
    </div>
  );
};

export default CollectionDetailPage;