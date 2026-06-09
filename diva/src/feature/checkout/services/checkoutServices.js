/* ================================================
   CHECKOUTSERVICES.JS — Serviço Compartilhado do Checkout

   Este arquivo existe para que outros módulos
   (como o painel de admin) possam buscar os pedidos
   salvos sem precisar conhecer o checkout inteiro.

   A chave usada no localStorage é "pedidos".
   ================================================ */

import { getStorageData } from "../../../core/storage.js";

// Nome da chave onde os pedidos ficam salvos
var CHAVE_PEDIDOS = "pedidos";

/* Retorna a lista de todos os pedidos já realizados.
   Se não houver nenhum pedido, retorna uma lista vazia. */
export function getOrders() {
  return getStorageData(CHAVE_PEDIDOS, []);
}
