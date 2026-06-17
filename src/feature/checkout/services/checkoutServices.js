/* ================================================
   CHECKOUTSERVICES.JS — Serviço Compartilhado do Checkout

   Este arquivo existe para que outros módulos
   (como o painel de admin) possam buscar os pedidos
   salvos sem precisar conhecer o checkout inteiro.

   A chave usada no localStorage é "pedidos".
   ================================================ */

import { getStorageData, setStorageData } from "../../../core/storage.js";

// Nome da chave onde os pedidos ficam salvos
var CHAVE_PEDIDOS = "pedidos";

/**
 * Retorna a lista de todos os pedidos já realizados.
 * Se não houver nenhum pedido, retorna uma lista vazia.
 */
export function getOrders() {
  return getStorageData(CHAVE_PEDIDOS, []);
}

/**
 * Cria um novo registro de pedido.
 * Boa Prática (SoC): Toda a montagem complexa do objeto e persistência 
 * de dados foi isolada nesta camada de Serviço.
 */
export function createOrder(dadosEntrega, formaPagamento, itensDoCarrinho, valorTotal, usuarioLogado) {
  if (!itensDoCarrinho || itensDoCarrinho.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  var novoPedido = {
    id: "PED-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    data: new Date().toISOString(),
    cliente: usuarioLogado ? usuarioLogado.nome : "Cliente Convidado",
    email: usuarioLogado ? usuarioLogado.email : "",
    itens: itensDoCarrinho,
    total: valorTotal,
    dadosEntrega: dadosEntrega,
    formaPagamento: formaPagamento,
    status: "Aguardando Envio"
  };

  var pedidos = getOrders();
  pedidos.push(novoPedido);
  
  // Salva no disco
  setStorageData(CHAVE_PEDIDOS, pedidos);

  return novoPedido;
}
