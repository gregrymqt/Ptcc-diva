import {
  getProductsWithCategory
}
from "../services/productService.js";

import {
  renderProducts
}
from "../components/productComponent.js";

const products =
  getProductsWithCategory();

renderProducts(
  products,
  "products-container"
);