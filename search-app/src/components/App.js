import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import BrandsPage from '../pages/BrandsPage';
import BrandDetailPage from '../pages/BrandDetailPage';
import CollectionsPage from '../pages/CollectionsPage';
import CollectionDetailPage from '../pages/CollectionDetailPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import '../App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:id" element={<BrandDetailPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
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
};

export default App;