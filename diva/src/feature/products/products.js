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

import {
  addToCart
}
from "../../cart/services/cartService.js";

import {
  showToast
}
from "../../../shared/components/toast/toastComponent.js";

import {
  navbarComponent
}
from "../../../shared/components/navbar/navbarComponent.js";

import {
  footerComponent
}
from "../../../shared/components/footer/footerComponent.js";

import {
  initNavbar
}
from "../../../shared/components/navbar/navbarController.js";

document.getElementById("navbar").innerHTML =
  navbarComponent();

document.getElementById("footer").innerHTML =
  footerComponent();

const products =
  getProductsWithCategory();

renderProducts(
  products,
  "products-container"
);

initFavoriteEvents();

initNavbar();

document
  .querySelectorAll(".add-to-cart-btn")
  .forEach(button => {

    button.addEventListener("click", () => {

      addToCart(button.dataset.id);

      showToast(
        "Produto adicionado ao carrinho!"
      );

    });

  });