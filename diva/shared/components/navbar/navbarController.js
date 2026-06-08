import {
  getCartItems
}
from "../../../feature/cart/services/cartService.js";

import {
  getFavorites
}
from "../../../feature/favorites/services/favoriteService.js";

export function initNavbar() {

  const toggle =
    document.getElementById("menuToggle");

  const menu =
    document.getElementById("navbarMenu");

  if (toggle && menu) {

    toggle.addEventListener("click", () => {

      menu.classList.toggle("active");

    });

  }

  updateNavbarCounters();

}

export function updateNavbarCounters() {

  const cartCount =
    document.getElementById("cart-count");

  const favoritesCount =
    document.getElementById("favorites-count");

  if (cartCount) {

    const cartItems =
      getCartItems();

    const totalItems =
      cartItems.reduce(
        (total, item) =>
          total + item.quantidade,
        0
      );

    cartCount.textContent =
      `(${totalItems})`;

  }

  if (favoritesCount) {

    favoritesCount.textContent =
      `(${getFavorites().length})`;

  }

}