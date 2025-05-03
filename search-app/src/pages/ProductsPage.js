import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);  // Initialize as empty array
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await api.getProducts();
        // Ensure data is an array before setting state
        const productsArray = Array.isArray(data) ? data : [];
        setProducts(productsArray);
        setFilteredProducts(productsArray);
        setError(null);
      } catch (err) {
        setError(err);
        // Set empty arrays on error to prevent further issues
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    if (query.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    try {
      const results = await api.searchProducts(query);
      // Ensure results.products is an array
      const productsArray = Array.isArray(results.products) ? results.products : [];
      setFilteredProducts(productsArray);
    } catch (err) {
      setError(err);
      setFilteredProducts([]);  // Set empty array on error
    }
  };

  // Get current products for pagination - with added safety checks
  const currentProducts = Array.isArray(filteredProducts) 
    ? filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
    : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          Error loading products: {error.message}
        </div>
        <Link to="/" className="btn btn-primary">Go Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Products</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {searchQuery && (
        <div className="mb-3">
          <h5>Search results for: "{searchQuery}"</h5>
          {filteredProducts.length === 0 && (
            <div className="alert alert-info">No products found. Try a different search term.</div>
          )}
        </div>
      )}

      {currentProducts.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {currentProducts.map(product => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <nav className="mt-5">
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
                
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        !searchQuery && (
          <div className="alert alert-info">
            No products available.
          </div>
        )
      )}
    </div>
  );
};

export default ProductsPage;