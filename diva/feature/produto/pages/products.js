import { getProducts } from "../services/productService.js";
import { renderProducts } from "../components/productComponent.js";

const products = getProducts();

renderProducts(
  products,
  "products-container"
);