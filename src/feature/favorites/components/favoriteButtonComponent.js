import {
  isFavorite
} from "../services/favoriteService.js";

export function favoriteButtonComponent(
  productId
) {

  var icon = "🤍";
  
  if (isFavorite(productId)) {
    icon = "❤️";
  }

  return '<button class="favorite-btn" data-product-id="' + productId + '">\n' +
         '  ' + icon + '\n' +
         '</button>';

}