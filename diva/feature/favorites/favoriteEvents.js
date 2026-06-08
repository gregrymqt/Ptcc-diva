import {
  toggleFavorite
}
from "./services/favoriteService.js";

export function initFavoriteEvents() {

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".favorite-btn"
        );

      if (!button) return;

      const productId =
        Number(
          button.dataset.productId
        );

      toggleFavorite(productId);

      location.reload();

    }
  );

}