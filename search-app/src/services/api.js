// src/services/api.js
const API_URL = 'http://localhost:8000/api';

const api = {
  // Product API calls
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/catalog/products/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/catalog/products/${id}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  // Brand API calls
  getBrands: async () => {
    try {
      const response = await fetch(`${API_URL}/catalog/brands/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },

  getBrand: async (id) => {
    try {
      const response = await fetch(`${API_URL}/catalog/brands/${id}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching brand with ID ${id}:`, error);
      throw error;
    }
  },

  // Collection API calls
  getCollections: async () => {
    try {
      const response = await fetch(`${API_URL}/catalog/collections/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  },

  getCollection: async (id) => {
    try {
      const response = await fetch(`${API_URL}/catalog/collections/${id}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching collection with ID ${id}:`, error);
      throw error;
    }
  },

  // Search API calls
  searchProducts: async (query) => {
    try {
      // Using your Django search endpoint
      const response = await fetch(`${API_URL}/search/?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Search API response:', data); // Debug log
      return data;
    } catch (error) {
      console.error(`Error searching for "${query}":`, error);
      throw error;
    }
  },

  // Search by type (products, brands, or collections)
  searchByType: async (type, query) => {
    try {
      const response = await fetch(`${API_URL}/search/${type}/?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Search ${type} API response:`, data); // Debug log
      return data;
    } catch (error) {
      console.error(`Error searching for ${type} with query "${query}":`, error);
      throw error;
    }
  }
};

export default api;