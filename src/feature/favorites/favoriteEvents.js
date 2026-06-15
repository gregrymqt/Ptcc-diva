/* ================================================
   FAVORITEEVENTS.JS — Eventos dos Botões de Favorito

   Este arquivo escuta os cliques em qualquer botão
   de favorito na página e atualiza o estado
   (adiciona ou remove dos favoritos).

   Funciona com "delegação de eventos": em vez de
   colocar um listener em cada botão individualmente,
   colocamos apenas UM listener no documento inteiro
   e verificamos se o clique foi em um botão de favorito.
   ================================================ */

import { toggleFavorite } from "./services/favoriteService.js";
import { showToast }      from "../../shared/components/toast/toastComponent.js";


/* Ativa a escuta de cliques nos botões de favorito.
   Deve ser chamada uma vez ao inicializar a página. */
export function initFavoriteEvents() {

  // Coloca um listener no documento inteiro
  document.addEventListener("click", function(evento) {

    // Verifica se o clique foi dentro de um botão com a classe "favorite-btn"
    var botao = evento.target.closest(".favorite-btn");

    // Se o clique não foi num botão de favorito, ignora
    if (!botao) {
      return;
    }

    // Lê o ID do produto guardado no atributo data-product-id do botão
    var produtoId = Number(botao.dataset.productId);

    // Alterna o favorito e recebe o resultado (true = adicionou, false = removeu)
    var foiAdicionado = toggleFavorite(produtoId);

    // Exibe uma mensagem de feedback para o usuário
    if (foiAdicionado) {
      showToast("Produto adicionado aos favoritos!");
    } else {
      showToast("Produto removido dos favoritos!");
    }

    // Aguarda um momento e recarrega a página para refletir a mudança
    setTimeout(function() {
      location.reload();
    }, 600);

  });

}