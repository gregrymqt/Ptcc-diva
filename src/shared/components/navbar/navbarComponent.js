/**
 * ================================================
 * NAVBARCOMPONENT.JS — Barra de Navegação
 *
 * Boa Prática de Arquitetura (SoC - Separation of Concerns):
 * Este arquivo é responsável *apenas* pela renderização do HTML (View).
 * Nenhuma lógica de negócio ou de eventos (como cliques) é definida aqui.
 * Isso torna o componente puro, previsível e fácil de testar.
 * A lógica e os cliques estão no navbarController.js.
 * ================================================
 */

/**
 * Retorna o HTML completo da Navbar.
 * @returns {string} String contendo a marcação HTML da navbar.
 */
export function navbarComponent() {
  return (
    '<header class="navbar">' +
      '<div class="navbar__container">' +

        '<a href="../../home/pages/home.html" class="navbar__logo">' +
          'Diva Makeup' +
        '</a>' +

        '<button class="navbar__toggle" id="menuToggle" aria-label="Abrir Menu">' +
          '☰' +
        '</button>' +

        '<nav class="navbar__menu" id="navbarMenu">' +

          '<a href="../../home/pages/home.html">Home</a>' +
          
          // Contêiner de Produtos
          '<span id="nav-item-products" class="nav-dropdown-wrapper">' +
            '<a href="../../products/pages/products.html">Produtos</a>' +
          '</span>' +
          
          // Contêiner de Categorias
          '<span id="nav-item-categories" class="nav-dropdown-wrapper">' +
            '<a href="../../categories/pages/categories.html">Categorias</a>' +
          '</span>' +

          '<a href="../../favorites/pages/favorites.html">' +
            'Favoritos <span id="favorites-count">(0)</span>' +
          '</a>' +

          '<div id="navbar-auth-container" style="display: contents;"></div>' +

          '<a href="../../cart/pages/cart.html" class="navbar__button">' +
            'Carrinho <span id="cart-count">(0)</span>' +
          '</a>' +

        '</nav>' +
      '</div>' +
    '</header>'
  );
}