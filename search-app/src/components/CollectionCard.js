import React from 'react';
import { Link } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
  // Add defensive check to make sure collection exists
  if (!collection) {
    return null;
  }
  
  // Guard against possible undefined properties
  const collectionTitle = collection.title_en || (collection.name || 'Unnamed Collection');
  const collectionTitleAr = collection.title_ar;
  const description = collection.description_en || collection.description;

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{collectionTitle}</h5>
        
        {collectionTitleAr && (
          <h6 className="card-subtitle mb-2 text-muted">{collectionTitleAr}</h6>
        )}
        
        {description && (
          <p className="card-text text-truncate">{description}</p>
        )}
        
        <Link to={`/collections/${collection.id}`} className="btn btn-primary">
          View Collection
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;