/* ================================================
   CART.JS — Página do Carrinho de Compras (Legado)

   Este arquivo é responsável por TUDO que acontece
   na página dedicada do carrinho (cart.html).

   Ele está dividido em 4 partes:
   1. Funções que lêem e modificam o carrinho
   2. Função que monta o HTML da tela
   3. Funções que reagem ao clique dos botões
   4. Inicialização da página (navbar, footer, itens)
   ================================================ */

import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }  from "../../shared/components/footer/footerComponent.js";
import { showToast }        from "../../shared/components/toast/toastComponent.js";
import { cartComponent }    from "./components/cartComponent.js";
import { getCart, updateCartQuantity, removeFromCart } from "./services/cartService.js";


/* --------------------------------------------------
   PARTE 2: MONTAR O HTML DA TELA

   Lê os itens do carrinho e monta o HTML
   que será exibido dentro de #cart-container.
   -------------------------------------------------- */

/* Monta e exibe todo o conteúdo da página do carrinho.
   É chamada na inicialização e toda vez que um item muda. */
function render() {
  // Coloca a navbar e o footer na tela
  document.querySelector("#navbar").innerHTML = navbarComponent();
  document.querySelector("#footer").innerHTML = footerComponent();

  // Boa Prática (SoC): A leitura dos dados agora é feita pela camada de Service
  var itens = getCart();

  // Chama o componente que monta o HTML do carrinho
  document.querySelector("#cart-container").innerHTML = cartComponent(itens);

  // Se o carrinho estiver vazio, não precisamos iniciar eventos de botões que não existem
  if (itens.length === 0) {
    return;
  }

  // Registra os eventos dos botões após o HTML ser inserido
  iniciarEventos();
}


/* --------------------------------------------------
   PARTE 3: EVENTOS DOS BOTÕES

   Registra as ações de clique para cada botão
   de aumentar, diminuir e remover.
   -------------------------------------------------- */

/* Percorre todos os botões de ação do carrinho
   e conecta cada um à sua função correspondente. */
function iniciarEventos() {
  // Botões de aumentar quantidade (+)
  var botoesAumentar = document.querySelectorAll(".increase-quantity");

  for (var i = 0; i < botoesAumentar.length; i++) {
    botoesAumentar[i].addEventListener("click", function() {
      var id = this.getAttribute("data-id");
      var itens = getCart();
      var itemAtual;
      
      for (var n = 0; n < itens.length; n++) {
        if (itens[n].id == id) itemAtual = itens[n];
      }

      if (itemAtual) {
        // Boa Prática (SoC): Delegamos a regra de negócio para a camada Service
        updateCartQuantity(id, itemAtual.quantidade + 1);
      }
      render(); // Atualiza a tela após a mudança
    });
  }

  // Botões de diminuir quantidade (-)
  var botoesDiminuir = document.querySelectorAll(".decrease-quantity");

  for (var j = 0; j < botoesDiminuir.length; j++) {
    botoesDiminuir[j].addEventListener("click", function() {
      var id = this.getAttribute("data-id");
      var itens = getCart();
      var itemAtual;

      for (var n = 0; n < itens.length; n++) {
        if (itens[n].id == id) itemAtual = itens[n];
      }

      if (itemAtual) {
        if (itemAtual.quantidade > 1) {
          updateCartQuantity(id, itemAtual.quantidade - 1);
        } else {
          removeFromCart(id);
        }
      }
      render();
    });
  }

  // Botões de remover item
  var botoesRemover = document.querySelectorAll(".remove-cart-item");

  for (var k = 0; k < botoesRemover.length; k++) {
    botoesRemover[k].addEventListener("click", function() {
      var id = this.getAttribute("data-id");
      removeFromCart(id);
      showToast("Produto removido do carrinho!");
      render();
    });
  }
}


/* --------------------------------------------------
   PARTE 4: INICIALIZAÇÃO

   Ponto de partida: monta a tela quando o
   arquivo é carregado pelo cart.html.
   -------------------------------------------------- */

render();