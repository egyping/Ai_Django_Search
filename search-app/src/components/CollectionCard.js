import React from 'react';
import { Link } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{collection.name}</h5>
        {collection.description && (
          <p className="card-text">{collection.description}</p>
        )}
        <Link to={`/collections/${collection.id}`} className="btn btn-primary">
          View Collection
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;