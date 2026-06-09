import { getCartTotals } from "../../../feature/cart/services/cartServices.js";
import { openCartDrawer } from "../../../feature/cart/components/CartDrawerComponent.js";
import { getFavorites } from "../../../feature/favorites/services/favoriteService.js";

export async function initNavbar() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("navbarMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Evento de abrir o carrinho
  const cartButton = document.querySelector(".navbar__button");
  if (cartButton) {
    cartButton.addEventListener("click", (e) => {
      e.preventDefault(); // Evita redirecionamento
      openCartDrawer();
    });
  }

  await updateNavbarCounters();

  // Escutar atualizações do carrinho
  window.addEventListener('cartUpdated', async () => {
    await updateNavbarCounters();
  });
}

export async function updateNavbarCounters() {
  const cartCount = document.getElementById("cart-count");
  const favoritesCount = document.getElementById("favorites-count");

  if (cartCount) {
    const { totalItems } = await getCartTotals();
    cartCount.textContent = `(${totalItems})`;
  }

  if (favoritesCount) {
    // favorites ainda é síncrono pelo visto
    const favorites = getFavorites();
    if(favorites) {
      favoritesCount.textContent = `(${favorites.length})`;
    } else {
      favoritesCount.textContent = `(0)`;
    }
  }
}