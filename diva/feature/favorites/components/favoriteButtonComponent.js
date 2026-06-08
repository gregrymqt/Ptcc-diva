import {
  isFavorite
} from "../services/favoriteService.js";

export function favoriteButtonComponent(
  productId
) {

  return `

    <button
      class="favorite-btn"
      data-product-id="${productId}"
    >
      ${isFavorite(productId)
        ? "❤️"
        : "🤍"
      }
    </button>

  `;

}