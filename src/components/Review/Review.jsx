import './review.scss';

import React from 'react';

import reviewIcon from '../../assets/svg/review.svg';

function Review({ products, categories }) {
  return (
    <div className="review-container">
      <div className="review-title">
        <img src={reviewIcon} alt="reviewIcon" />
        <h2>Review</h2>
      </div>
      <div>
        <p>Available Products: {products.length}</p>
        <p>Categories: {categories.length}</p>
        <div className="categories-detail">
          {categories.map((category) => (
            <div key={category.id}>
              <p>
                {category.name}: {category.products.length} products
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
