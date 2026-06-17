import { isFavorite } from "../../favorites/services/favoriteService.js";

/**
 * Monta o botão de favorito com o ícone certo (❤️ ou 🤍).
 */
function montarBotaoFavorito(produtoId) {
  var ehFavorito = isFavorite(produtoId);
  var icone      = ehFavorito ? "❤️" : "🤍";

  return (
    '<button class="favorite-btn" data-product-id="' + produtoId + '">' +
      icone +
    '</button>'
  );
}

/**
 * Componente Burro (Dumb Component).
 * Boa Prática (SoC): Responsável unicamente por renderizar a marcação HTML de um Card de Produto.
 */
export function productComponent(produto) {
  return (
    '<div class="product-card">' +
      '<div class="product-image-wrapper">' +
        '<img src="' + produto.imagem + '" alt="' + produto.nome + '">' +
        montarBotaoFavorito(produto.id) +
      '</div>' +
      '<h3>' + produto.nome + '</h3>' +
      '<p>' + produto.descricao + '</p>' +
      '<small>Categoria: ' + produto.categoryName + '</small>' +
      '<span>R$ ' + Number(produto.preco).toFixed(2) + '</span>' +
      '<button class="add-to-cart-btn" data-id="' + produto.id + '">Adicionar ao Carrinho</button>' +
    '</div>'
  );
}
