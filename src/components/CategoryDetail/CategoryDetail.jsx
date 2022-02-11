import './categoryDetail.scss';

import React, { useState } from 'react';

import categoryIcon from '../../assets/svg/category.svg';
import heartIcon from '../../assets/svg/heart.svg';

function CategoryDetail({
  category,
  productsStash,
  removeCategory,
  addProductsToCategory,
  removeProductsFromCategory,
}) {
  const [categoryStash, setCategoryStash] = useState([]);
  // Category Stash
  const handleCategoryStash = (e, product) => {
    if (e.target.checked) {
      const newCategoryStash = [...categoryStash, product];
      setCategoryStash(newCategoryStash);
    } else {
      const newCategoryStash = categoryStash.filter(
        (item) => item.id !== product.id
      );
      setCategoryStash(newCategoryStash);
    }
  };
  const clearStash = () => {
    setCategoryStash([]);
  };

  const handleRemove = () => {
    removeProductsFromCategory(category.id, categoryStash);
    clearStash();
  };

  return (
    <div className="category-detail-container ">
      <div className="category-detail-container-inner">
        <div className="category-title">
          <img src={categoryIcon} alt="categoryIcon" />
          <h2>{category.name}</h2>
        </div>
        <ul>
          {category.products.map((product) => (
            <li key={product.id}>
              <label
                htmlFor={`availableProduct${product.id}`}
                className="category-product-label"
              >
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoryStash(e, product)}
                  id={`availableProduct${product.id}`}
                  className="category-product-checkbox"
                />
                {product.name}
              </label>
            </li>
          ))}
          {category.products.length === 0 && (
            <li className="empty-category">
              <img src={heartIcon} alt="heartIcon" />
              <p>Select products to add here.</p>
            </li>
          )}
        </ul>
      </div>

      <div className="category-buttons">
        <div className="operation-buttons">
          <button
            type="submit"
            onClick={() => addProductsToCategory(category.id, productsStash)}
            className={
              productsStash.length === 0
                ? 'category-btn-secondary'
                : 'category-btn-primary'
            }
          >
            {productsStash.length === 0
              ? 'Add Products'
              : `Add ${productsStash.length} Product`}
          </button>
          <button
            type="submit"
            onClick={handleRemove}
            className={
              categoryStash.length === 0
                ? 'category-btn-secondary'
                : 'category-btn-primary'
            }
          >
            {categoryStash.length === 0
              ? 'Remove Products'
              : `Remove ${categoryStash.length} Product`}
          </button>
        </div>
        <button
          type="submit"
          onClick={() => removeCategory(category.id)}
          className="category-btn-primary remove-category"
        >
          Remove Category
        </button>
      </div>
    </div>
  );
}

export default CategoryDetail;
