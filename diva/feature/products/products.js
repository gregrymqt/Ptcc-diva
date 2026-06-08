import {
  getProductsWithCategory
}
from "../services/productService.js";

import {
  renderProducts
}
from "../components/productComponent.js";

import {
  initFavoriteEvents
}
from "../../favorites/favoriteEvents.js";

const products =
  getProductsWithCategory();

renderProducts(
  products,
  "products-container"
);

initFavoriteEvents();