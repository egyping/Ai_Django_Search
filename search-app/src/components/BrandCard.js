import React from 'react';
import { Link } from 'react-router-dom';

const BrandCard = ({ brand }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{brand.name}</h5>
        {brand.description && (
          <p className="card-text">{brand.description}</p>
        )}
        <Link to={`/brands/${brand.id}`} className="btn btn-primary">
          View Brand
        </Link>
      </div>
    </div>
  );
};

export default BrandCard;