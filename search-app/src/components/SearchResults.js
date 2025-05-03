import React from 'react';
import BrandCard from './BrandCard';
import CollectionCard from './CollectionCard';
import ProductCard from './ProductCard';

const SearchResults = ({ results, isLoading, error }) => {
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
        Error: {error.message}
      </div>
    );
  }

  if (!results || (
    (!results.brands || results.brands.length === 0) &&
    (!results.collections || results.collections.length === 0) &&
    (!results.products || results.products.length === 0)
  )) {
    return (
      <div className="alert alert-info my-3" role="alert">
        No results found. Please try a different search term.
      </div>
    );
  }

  return (
    <div className="search-results">
      {/* Display Brands */}
      {results.brands && results.brands.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Brands</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {results.brands.map(brand => (
              <div className="col" key={brand.id}>
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Collections */}
      {results.collections && results.collections.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Collections</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {results.collections.map(collection => (
              <div className="col" key={collection.id}>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Products */}
      {results.products && results.products.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Products</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {results.products.map(product => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;