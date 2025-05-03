// src/components/SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import BrandCard from './BrandCard';
import CollectionCard from './CollectionCard';

const SearchResults = ({ results, isLoading, error, searchQuery }) => {
  // Extract the different types of results
  const products = results?.products?.results || [];
  const brands = results?.brands || [];
  const collections = results?.collections || [];
  
  // Calculate total results count
  const totalProducts = products.length;
  const totalBrands = brands.length;
  const totalCollections = collections.length;
  const totalResults = totalProducts + totalBrands + totalCollections;

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
      <div className="alert alert-danger">
        Error loading search results: {error}
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="alert alert-info">
        Enter a search term to find products, brands, and collections.
      </div>
    );
  }

  if (searchQuery && totalResults === 0) {
    return (
      <div className="alert alert-info">
        No results found for "{searchQuery}". Try a different search term.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h5>Results for: "{searchQuery}"</h5>
        <p>Found {totalResults} items</p>
      </div>

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
          {totalProducts > 3 && (
            <div className="text-center mt-3">
              <Link to={`/search/products?q=${encodeURIComponent(searchQuery)}`} className="btn btn-outline-primary">
                View All Products
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Brands Section */}
      {totalBrands > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Brands ({totalBrands})</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {brands.slice(0, 3).map(brand => (
              <div className="col" key={brand.id}>
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>
          {totalBrands > 3 && (
            <div className="text-center mt-3">
              <Link to={`/search/brands?q=${encodeURIComponent(searchQuery)}`} className="btn btn-outline-primary">
                View All Brands
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Collections Section */}
      {totalCollections > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Collections ({totalCollections})</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {collections.slice(0, 3).map(collection => (
              <div className="col" key={collection.id}>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
          {totalCollections > 3 && (
            <div className="text-center mt-3">
              <Link to={`/search/collections?q=${encodeURIComponent(searchQuery)}`} className="btn btn-outline-primary">
                View All Collections
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;