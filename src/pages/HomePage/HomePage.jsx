import './homePage.scss';

import React, { useState } from 'react';

import products from '../../assets/products';
import AvailableProducts from '../../components/AvailableProducts/AvailableProducts';
import CategoryList from '../../components/CategoriesList/CategoryList';

const initialCategories = [
  {
    id: 1,
    name: 'Category 1',
    products: [],
  },
];

function HomePage() {
  const [title, setTitle] = useState('Initial Screen');
  const [productsList, setProductsList] = useState(products);
  const [productsStash, setProductsStash] = useState([]);
  const [categories, setCategories] = useState([...initialCategories]);

  // available Products
  const addAvailableProduct = (stash) => {
    const newProductsList = [...productsList, ...stash];
    newProductsList.sort((a, b) => a.id - b.id);
    setProductsList(newProductsList);
  };
  const removeAvailableProduct = () => {
    let newProductsList = productsList;
    productsStash.forEach((item) => {
      newProductsList = newProductsList.filter(
        (product) => product.id !== item.id
      );
    });
    setProductsList(newProductsList);
  };
  const changeTitle = (stash) => {
    if (stash.length > 0) {
      setTitle('Products Selected');
    } else {
      setTitle('Initial Screen');
    }
  };
  // Products Stash
  const handleProductsStash = (e, product) => {
    if (e.target.checked) {
      const newProductsStash = [...productsStash, product];
      changeTitle(newProductsStash);
      setProductsStash(newProductsStash);
    } else {
      const newProductsStash = productsStash.filter(
        (item) => item.id !== product.id
      );
      changeTitle(newProductsStash);
      setProductsStash(newProductsStash);
    }
  };
  const clearStash = () => {
    setProductsStash([]);
  };

  // Categories
  const createCategory = () => {
    let lastCategoryId = 0;
    if (categories.length) {
      lastCategoryId = categories[categories.length - 1].id;
    }
    const tempCategory = {
      id: lastCategoryId + 1,
      name: `Category ${lastCategoryId + 1}`,
      products: [],
    };
    setCategories([...categories, tempCategory]);
    setTitle('New Category Created');
  };
  const removeCategory = (id) => {
    const tempCategory = categories.filter((category) => category.id === id)[0];
    const newCategories = categories.filter((category) => category.id !== id);
    newCategories.sort((a, b) => a.id - b.id);
    addAvailableProduct(tempCategory.products);
    setCategories(newCategories);
    setTitle(`Category ${id} Removed`);
  };

  // adding products to category
  const addProductsToCategory = (categoryId) => {
    const tempCategory = categories.filter(
      (category) => category.id === categoryId
    )[0];
    const newCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    tempCategory.products = [...tempCategory.products, ...productsStash];
    tempCategory.products.sort((a, b) => a.id - b.id);
    newCategories.push(tempCategory);
    newCategories.sort((a, b) => a.id - b.id);
    setCategories([...newCategories]);
    removeAvailableProduct();
    setTitle(`Products Added to Category ${categoryId}`);
    clearStash();
  };
  // removing products from category
  const removeProductsFromCategory = (categoryId, stash) => {
    const tempCategory = categories.filter(
      (category) => category.id === categoryId
    )[0];
    const newCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    stash.forEach((item) => {
      tempCategory.products = tempCategory.products.filter(
        (product) => product.id !== item.id
      );
    });
    tempCategory.products.sort((a, b) => a.id - b.id);
    newCategories.push(tempCategory);
    newCategories.sort((a, b) => a.id - b.id);
    addAvailableProduct(stash);
    setCategories([...newCategories]);
    setTitle(`${stash.length} Product Removed From Category ${categoryId}`);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">{title}</h1>
      <div className="homepage-wrapper">
        <AvailableProducts
          products={productsList}
          handleProductsStash={handleProductsStash}
          categories={categories}
        />
        <CategoryList
          productsStash={productsStash}
          categories={categories}
          createCategory={createCategory}
          removeCategory={removeCategory}
          addProductsToCategory={addProductsToCategory}
          removeProductsFromCategory={removeProductsFromCategory}
        />
      </div>
    </div>
  );
}

export default HomePage;
