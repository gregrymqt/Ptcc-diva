/* ================================================
   NAVBARCOMPONENT.JS — Barra de Navegação

   Este arquivo apenas constrói o HTML da barra
   de navegação que fica no topo do site.
   A lógica e os cliques estão no navbarController.js.
   ================================================ */

/* Retorna o HTML completo da Navbar. */
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
          '<a href="../../products/pages/products.html">Produtos</a>' +
          '<a href="../../categories/pages/categories.html">Categorias</a>' +

          '<a href="../../favorites/pages/favorites.html">' +
            'Favoritos <span id="favorites-count">(0)</span>' +
          '</a>' +

          '<a href="../../cart/pages/cart.html" class="navbar__button">' +
            'Carrinho <span id="cart-count">(0)</span>' +
          '</a>' +

        '</nav>' +
      '</div>' +
    '</header>'
  );
}