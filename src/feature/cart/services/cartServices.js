/* ================================================
   CARTSERVICES.JS — Serviço Compartilhado do Carrinho

   Este arquivo contém as funções do carrinho que
   são usadas por outros módulos (navbar, checkout).

   A chave usada no localStorage é "carrinho".
   ================================================ */

import { getStorageData, setStorageData } from "../../../core/storage.js";

// Nome da chave onde o carrinho fica salvo no navegador
var CHAVE_CARRINHO = "carrinho";

/* Lê e retorna todos os itens do carrinho.
   Se não houver nada salvo, retorna uma lista vazia. */
export function getCart() {
  return getStorageData(CHAVE_CARRINHO, []);
}

/* Calcula e retorna o total de itens e o valor total do carrinho. */
export function getCartTotals() {
  var carrinho   = getCart();
  var totalItens = 0;
  var totalValor = 0;

  // Percorre todos os itens somando quantidades e valores
  for (var i = 0; i < carrinho.length; i++) {
    totalItens = totalItens + carrinho[i].quantidade;
    totalValor = totalValor + (carrinho[i].preco * carrinho[i].quantidade);
  }

  return { totalItems: totalItens, totalValue: totalValor };
}

/* Esvazia completamente o carrinho. */
export function clearCart() {
  setStorageData(CHAVE_CARRINHO, []);
  window.dispatchEvent(new Event("cartUpdated"));
}
