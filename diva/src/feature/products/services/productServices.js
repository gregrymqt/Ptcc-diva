import {
  getCategories
}
from "../../categories/services/categoryService.js";

const STORAGE_KEY = "products";

/* PEGAR TODOS PRODUTOS */

export function getProducts() {

  const products = localStorage.getItem(STORAGE_KEY);

  return products ? JSON.parse(products) : [];

}

/* SALVAR TODOS PRODUTOS */
function saveProducts(products) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );

}

/* CRIAR PRODUTO */
export function createProduct(product) {

  const products = getProducts();

  products.push(product);

  saveProducts(products);

}

/* BUSCAR PRODUTO POR ID */
export function findProductById(id) {

  const products = getProducts();

  return products.find(
    product => product.id === id
  );

}

/* ATUALIZAR PRODUTO */
export function updateProduct(id, updatedData) {

  const products = getProducts();

  const updatedProducts = products.map(product => {

    if(product.id === id){

      return {
        ...product,
        ...updatedData
      };

    }

    return product;

  });

  saveProducts(updatedProducts);

}

/* DELETAR PRODUTO */
export function deleteProduct(id) {

  const products = getProducts();

  const filteredProducts = products.filter(
    product => product.id !== id
  );

  saveProducts(filteredProducts);

}

export function getProductsWithCategory() {

  const products =
    getProducts();

  const categories =
    getCategories();

  return products.map(product => {

    const category =
      categories.find(
        category =>
          category.id === product.categoryId
      );

    return {

      ...product,

      categoryName:
        category?.nome ||
        "Sem Categoria"

    };

  });

}