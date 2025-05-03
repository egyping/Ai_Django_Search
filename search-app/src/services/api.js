// src/services/api.js
import axios from 'axios';

// Use 127.0.0.1 instead of localhost to match your working API
const API_URL = 'http://127.0.0.1:8000/api';

// Add debug logging to see the actual data structure
const api = {
  // Search endpoints
  search: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search/?q=${query}`);
      console.log('Search API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },
  
  searchProducts: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search/products/?q=${query}`);
      console.log('Search Products API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
  
  searchBrands: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search/brands/?q=${query}`);
      console.log('Search Brands API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching brands:', error);
      throw error;
    }
  },
  
  searchCollections: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search/collections/?q=${query}`);
      console.log('Search Collections API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching collections:', error);
      throw error;
    }
  },
  
  // Catalog endpoints - Products
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/catalog/products/`);
      console.log('Products API response:', response.data);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (response.data && typeof response.data === 'object') {
        // If it's an object, try to extract any array property
        const possibleArrays = Object.values(response.data).filter(Array.isArray);
        if (possibleArrays.length > 0) {
          return possibleArrays[0];
        }
      }
      
      // If we can't find an array, return an empty array
      console.warn('Could not extract products array from API response:', response.data);
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  getProduct: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/catalog/products/${id}/`);
      console.log('Product Detail API response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
  
  getProductsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}/catalog/products/category/?type=${category}`);
      console.log('Products by Category API response:', response.data);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching products by category ${category}:`, error);
      throw error;
    }
  },
  
  // Catalog endpoints - Brands
  getBrands: async () => {
    try {
      const response = await axios.get(`${API_URL}/catalog/brands/`);
      console.log('Brands API response:', response.data);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (response.data && typeof response.data === 'object') {
        const possibleArrays = Object.values(response.data).filter(Array.isArray);
        if (possibleArrays.length > 0) {
          return possibleArrays[0];
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },
  
  getBrand: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/catalog/brands/${id}/`);
      console.log('Brand Detail API response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching brand ${id}:`, error);
      throw error;
    }
  },
  
  getProductsByBrand: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/catalog/brands/${id}/products/`);
      console.log('Products by Brand API response:', response.data);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching products for brand ${id}:`, error);
      throw error;
    }
  },
  
  // Catalog endpoints - Collections
  getCollections: async () => {
    try {
      const response = await axios.get(`${API_URL}/catalog/collections/`);
      console.log('Collections API response:', response.data);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (response.data && typeof response.data === 'object') {
        const possibleArrays = Object.values(response.data).filter(Array.isArray);
        if (possibleArrays.length > 0) {
          return possibleArrays[0];
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  },
  
  getCollection: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/catalog/collections/${id}/`);
      console.log('Collection Detail API response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching collection ${id}:`, error);
      throw error;
    }
  },
  
  getProductsByCollection: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/catalog/collections/${id}/products/`);
      console.log('Products by Collection API response:', response.data);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching products for collection ${id}:`, error);
      throw error;
    }
  }
};

export default api;