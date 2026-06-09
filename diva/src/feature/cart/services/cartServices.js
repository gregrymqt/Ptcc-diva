import { getStorageData, setStorageData } from "../../../core/storage.js";

const CART_KEY = "carrinho";

// Retorna os itens do carrinho
export async function getCart() {
  const cart = await getStorageData(CART_KEY);
  return cart || [];
}

// Adiciona um item ao carrinho
export async function addToCart(produto, corSelecionada) {
  const cart = await getCart();
  
  const existingItemIndex = cart.findIndex(
    item => item.id === produto.id && item.corSelecionada === corSelecionada
  );

  if (existingItemIndex !== -1) {
    // Se já existe, incrementa a quantidade
    cart[existingItemIndex].quantidade += 1;
  } else {
    // Se não existe, adiciona novo item
    const newItem = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.variacoes ? 
        (produto.variacoes.find(v => v.cor === corSelecionada)?.imagem || produto.variacoes[0].imagem) 
        : 'https://via.placeholder.com/600x600?text=Sem+Imagem',
      corSelecionada: corSelecionada,
      quantidade: 1
    };
    cart.push(newItem);
  }

  await setStorageData(CART_KEY, cart);
  
  // Opcionalmente disparar um evento customizado para notificar componentes de UI
  window.dispatchEvent(new Event('cartUpdated'));
}

// Atualiza a quantidade de um item
export async function updateQuantity(productId, cor, novaQuantidade) {
  if (novaQuantidade < 1) return;

  const cart = await getCart();
  const item = cart.find(i => i.id === productId && i.corSelecionada === cor);
  
  if (item) {
    item.quantidade = novaQuantidade;
    await setStorageData(CART_KEY, cart);
    window.dispatchEvent(new Event('cartUpdated'));
  }
}

// Remove um item do carrinho
export async function removeFromCart(productId, cor) {
  const cart = await getCart();
  const updatedCart = cart.filter(
    item => !(item.id === productId && item.corSelecionada === cor)
  );
  
  await setStorageData(CART_KEY, updatedCart);
  window.dispatchEvent(new Event('cartUpdated'));
}

// Retorna o total de itens e valor
export async function getCartTotals() {
  const cart = await getCart();
  
  const totalItems = cart.reduce((total, item) => total + item.quantidade, 0);
  const totalValue = cart.reduce((total, item) => total + (item.preco * item.quantidade), 0);

  return {
    totalItems,
    totalValue
  };
}
