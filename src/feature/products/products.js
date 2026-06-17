/* ================================================
   PRODUCTS.JS — Página de Listagem de Produtos

   Este arquivo monta a página com todos os produtos
   da loja e gerencia as interações dos botões.

   Ele está dividido em 4 partes:
   1. Montar a navbar e o footer
   2. Buscar e exibir os produtos na tela
   3. Ativar o botão de favorito de cada produto
   4. Ativar o botão "Adicionar ao Carrinho"
   ================================================ */

import { getProductsWithCategory } from "./services/productServices.js";
import { productComponent }        from "./components/productComponent.js";
import { initFavoriteEvents }      from "../favorites/favoriteEvents.js";
import { addToCart }               from "../cart/services/cartDrawerService.js";
import { openCartDrawer }          from "../cart/components/CartDrawerComponent.js";
import { showToast }               from "../../shared/components/toast/toastComponent.js";
import { navbarComponent }         from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }         from "../../shared/components/footer/footerComponent.js";
import { initNavbar }              from "../../shared/components/navbar/navbarController.js";

/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();


/* --------------------------------------------------
   PARTE 2: BUSCAR E EXIBIR OS PRODUTOS

   Lê os produtos do localStorage e monta os cards
   dentro do container da página.
   -------------------------------------------------- */

/* Monta e exibe todos os cards de produto na tela. */
function exibirProdutos() {
  var produtos  = getProductsWithCategory();
  var container = document.getElementById("products-container");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  var htmlCards = "";

  for (var i = 0; i < produtos.length; i++) {
    // Boa Prática (SoC): O HTML não é mais desenhado aqui. O Controller delega isso.
    htmlCards += productComponent(produtos[i]);
  }
  
  container.innerHTML = htmlCards;
}

exibirProdutos();


/* --------------------------------------------------
   PARTE 3: ATIVAR BOTÕES DE FAVORITO

   Usa o sistema de delegação de eventos para
   escutar todos os cliques em botões de favorito.
   -------------------------------------------------- */
initFavoriteEvents();


/* --------------------------------------------------
   PARTE 4: BOTÃO "ADICIONAR AO CARRINHO"

   Quando o usuário clicar em "Adicionar ao Carrinho",
   busca o produto e abre a gaveta do carrinho.
   -------------------------------------------------- */

/* Registra o evento de clique para todos os botões
   de adicionar ao carrinho que estão na tela. */
function ativarBotoesDeCarrinho() {
  var botoes = document.querySelectorAll(".add-to-cart-btn");

  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function() {
      var produtoId = this.getAttribute("data-id");

      // Busca o produto correspondente ao botão clicado
      var produtos  = getProductsWithCategory();
      var produto   = null;

      for (var j = 0; j < produtos.length; j++) {
        if (produtos[j].id == produtoId) {
          produto = produtos[j];
        }
      }

      if (!produto) {
        showToast("Produto não encontrado!");
        return;
      }

      // Adiciona o produto ao carrinho com a variação padrão
      var corPadrao = "Única";

      if (produto.variacoes && produto.variacoes.length > 0) {
        corPadrao = produto.variacoes[0].cor;
      }

      addToCart(produto, corPadrao);
      showToast("Produto adicionado à sacola!");
      openCartDrawer();
    });
  }
}

ativarBotoesDeCarrinho();


/* --------------------------------------------------
   ATIVAR COMPORTAMENTOS DA NAVBAR
   -------------------------------------------------- */
initNavbar();