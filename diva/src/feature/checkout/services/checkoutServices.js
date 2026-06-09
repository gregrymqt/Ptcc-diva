import { getStorageData, setStorageData } from "../../../core/storage.js";
import { getCartTotals, getCart, clearCart } from "../../cart/services/cartServices.js";

const ORDERS_KEY = "pedidos";

// Função para gerar um ID único simples
function generateOrderId() {
  return 'PED-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function getOrders() {
  const orders = await getStorageData(ORDERS_KEY);
  return orders || [];
}

export async function createOrder(dadosEntrega, formaPagamento) {
  const cartItems = await getCart();
  
  if (cartItems.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  const totals = await getCartTotals();
  
  // No mundo real, aqui pegaríamos o usuário autenticado do storage
  // Para fins de simulação, vamos criar o pedido associado a um cliente "Convidado" se não houver um.
  const currentUser = await getStorageData('currentUser'); // Se existir
  
  const novoPedido = {
    id: generateOrderId(),
    data: new Date().toISOString(),
    cliente: currentUser ? currentUser.nome : dadosEntrega.nome || "Cliente Convidado",
    email: currentUser ? currentUser.email : dadosEntrega.email || "",
    itens: cartItems,
    totais: totals,
    dadosEntrega,
    formaPagamento,
    status: "Aguardando Envio"
  };

  const orders = await getOrders();
  orders.push(novoPedido);
  
  await setStorageData(ORDERS_KEY, orders);
  
  // Limpa o carrinho após fechar o pedido
  await clearCart();
  
  return novoPedido;
}
