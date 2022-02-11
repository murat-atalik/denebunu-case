import './categoryList.scss';

import React from 'react';

import CategoryDetail from '../CategoryDetail/CategoryDetail';

function CategoryList({
  productsStash,
  categories,
  createCategory,
  removeCategory,
  addProductsToCategory,
  removeProductsFromCategory,
}) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryDetail
            category={category}
            productsStash={productsStash}
            removeCategory={removeCategory}
            addProductsToCategory={addProductsToCategory}
            removeProductsFromCategory={removeProductsFromCategory}
          />
        </div>
      ))}
      <button
        type="submit"
        onClick={createCategory}
        className="create-category-button"
      >
        Add Category
      </button>
    </div>
  );
}

export default CategoryList;
