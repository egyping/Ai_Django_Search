// src/components/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import BrandDetailPage from '../pages/BrandDetailPage';
import CollectionDetailPage from '../pages/CollectionDetailPage';
import BrandsPage from '../pages/BrandsPage';
import CollectionsPage from '../pages/CollectionsPage';
import SearchPage from '../pages/SearchPage';
import TypeSearchPage from '../pages/TypeSearchPage';

function App() {
  console.log('App is rendering'); // Debug log
  
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:id" element={<BrandDetailPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:type" element={<TypeSearchPage />} />
        </Routes>
      </main>
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p>Product Search App &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;