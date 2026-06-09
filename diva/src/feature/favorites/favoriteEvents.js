import {
  toggleFavorite
}
from "./services/favoriteService.js";

import {
  showToast
}
from "../../shared/components/toast/toastComponent.js";

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

      const added =
        toggleFavorite(productId);

      showToast(
        added
          ? "Produto adicionado aos favoritos!"
          : "Produto removido dos favoritos!"
      );

      setTimeout(() => {

        location.reload();

      }, 600);

    }
  );

}