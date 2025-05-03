import React, { useState, useEffect } from 'react';

const SearchBar = ({ initialValue = '', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Update searchTerm when initialValue changes (e.g., when navigating)
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="search"
        className="form-control me-2"
        placeholder="Search products, brands, collections..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;