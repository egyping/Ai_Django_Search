import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setIsLoading(true);
        const data = await api.search(query);
        setResults(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Search Results for: <span className="text-primary">"{query}"</span></h1>
      <SearchResults results={results} isLoading={isLoading} error={error} />
    </div>
  );
};

export default SearchPage;