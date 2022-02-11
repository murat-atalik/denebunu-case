import './availableProducts.scss';

import React from 'react';

import productIcon from '../../assets/svg/products.svg';
import Review from '../Review/Review';

function AvailableProducts({ products, handleProductsStash, categories }) {
  return (
    <div className="available-products-container">
      <div className="available-products-wrapper">
        <div className="available-products-title">
          <img src={productIcon} alt="product-icon" />
          <h2>Available Products</h2>
        </div>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              <label
                htmlFor={`availableProduct${product.id}`}
                className="product-label"
              >
                <input
                  type="checkbox"
                  onChange={(e) => handleProductsStash(e, product)}
                  id={`availableProduct${product.id}`}
                  className="product-checkbox"
                />
                {product.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <Review products={products} categories={categories} />
    </div>
  );
}

export default AvailableProducts;
