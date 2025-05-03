import React from 'react';
import { Link } from 'react-router-dom';

const BrandCard = ({ brand }) => {
  // Add defensive check to make sure brand exists
  if (!brand) {
    return null;
  }
  
  // Guard against possible undefined properties
  const brandTitle = brand.title_en || (brand.name || 'Unnamed Brand');
  const brandTitleAr = brand.title_ar;
  const description = brand.description_en || brand.description;

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{brandTitle}</h5>
        
        {brandTitleAr && (
          <h6 className="card-subtitle mb-2 text-muted">{brandTitleAr}</h6>
        )}
        
        {description && (
          <p className="card-text text-truncate">{description}</p>
        )}
        
        <Link to={`/brands/${brand.id}`} className="btn btn-primary">
          View Brand
        </Link>
      </div>
    </div>
  );
};

export default BrandCard;