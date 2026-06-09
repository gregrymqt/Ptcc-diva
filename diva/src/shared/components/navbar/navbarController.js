/* ================================================
   NAVBARCONTROLLER.JS — Comportamento da Navbar

   Este arquivo adiciona a lógica interativa à
   navbar que já foi criada pelo navbarComponent.js.

   Ele cuida de:
   - Abrir/fechar o menu hambúrguer no mobile
   - Abrir a gaveta do carrinho ao clicar no ícone
   - Atualizar o contador de itens no carrinho e favoritos
   ================================================ */

import { getCartTotals }   from "../../../feature/cart/services/cartServices.js";
import { openCartDrawer }  from "../../../feature/cart/components/CartDrawerComponent.js";
import { getFavorites }    from "../../../feature/favorites/services/favoriteService.js";

/* Inicializa todos os comportamentos da navbar.
   Deve ser chamada após o HTML da navbar ser inserido na página. */
export function initNavbar() {
  // Pega os elementos do menu hambúrguer (versão mobile)
  var toggle = document.getElementById("menuToggle");
  var menu   = document.getElementById("navbarMenu");

  // Se o botão do menu existir, ativa o toggle de abrir/fechar
  if (toggle && menu) {
    toggle.addEventListener("click", function() {
      menu.classList.toggle("active");
    });
  }

  // Pega o botão do carrinho na navbar
  var botaoCarrinho = document.querySelector(".navbar__button");

  if (botaoCarrinho) {
    botaoCarrinho.addEventListener("click", function(e) {
      // Impede que o link do botão redirecione para outra página
      e.preventDefault();

      // Abre a gaveta lateral do carrinho
      openCartDrawer();
    });
  }

  // Atualiza os contadores (carrinho e favoritos) ao carregar
  atualizarContadores();

  // Toda vez que o carrinho for atualizado, atualiza os contadores
  window.addEventListener("cartUpdated", function() {
    atualizarContadores();
  });
}

/* Atualiza os números de quantidade exibidos na navbar
   (ex: "Carrinho (3)" e "Favoritos (2)"). */
export function atualizarContadores() {
  var contadorCarrinho  = document.getElementById("cart-count");
  var contadorFavoritos = document.getElementById("favorites-count");

  // Atualiza o contador do carrinho se o elemento existir na tela
  if (contadorCarrinho) {
    var totais = getCartTotals();
    contadorCarrinho.textContent = "(" + totais.totalItems + ")";
  }

  // Atualiza o contador de favoritos se o elemento existir na tela
  if (contadorFavoritos) {
    var favoritos = getFavorites();

    if (favoritos) {
      contadorFavoritos.textContent = "(" + favoritos.length + ")";
    } else {
      contadorFavoritos.textContent = "(0)";
    }
  }
}