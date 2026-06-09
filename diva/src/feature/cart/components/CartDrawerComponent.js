import { getCart, removeFromCart, updateQuantity, getCartTotals } from "../services/cartServices.js";

// Renderiza o Drawer no body se não existir
function injectCartHTML() {
  if (document.getElementById('cart-drawer-overlay')) return;

  const html = `
    <div id="cart-drawer-overlay" class="cart-overlay"></div>
    <div id="cart-drawer" class="cart-drawer">
      <div class="cart-header">
        <h2>Sua Sacola</h2>
        <button id="btn-close-cart" class="btn-close-cart" aria-label="Fechar carrinho">&times;</button>
      </div>
      <div id="cart-body" class="cart-body">
        <!-- Itens injetados via JS -->
      </div>
      <div class="cart-footer">
        <div class="cart-subtotal">
          <span>Subtotal:</span>
          <span id="cart-subtotal-value">R$ 0,00</span>
        </div>
        <button class="btn-checkout">Finalizar Compra</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

const formatPrice = (price) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

export async function renderCartItems() {
  const cartBody = document.getElementById('cart-body');
  const subtotalEl = document.getElementById('cart-subtotal-value');
  
  if (!cartBody || !subtotalEl) return;

  const cart = await getCart();
  const totals = await getCartTotals();

  subtotalEl.textContent = formatPrice(totals.totalValue);
  
  const btnCheckout = document.querySelector('#cart-drawer .btn-checkout');
  if (btnCheckout) {
    btnCheckout.disabled = cart.length === 0;
  }

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <h3>Sua sacola está vazia</h3>
        <button id="btn-continue-shopping" class="btn-continue">Continuar Comprando</button>
      </div>
    `;
    
    document.getElementById('btn-continue-shopping')?.addEventListener('click', closeCartDrawer);
    return;
  }

  cartBody.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.imagem}" alt="${item.nome}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.nome}</h4>
        <span class="cart-item-color">Cor: ${item.corSelecionada}</span>
        <span class="cart-item-price">${formatPrice(item.preco)}</span>
        
        <div class="cart-item-actions">
          <div class="quantity-controls">
            <button class="btn-qty btn-minus" data-id="${item.id}" data-color="${item.corSelecionada}">-</button>
            <span class="qty-value">${item.quantidade}</span>
            <button class="btn-qty btn-plus" data-id="${item.id}" data-color="${item.corSelecionada}">+</button>
          </div>
          <button class="btn-remove" data-id="${item.id}" data-color="${item.corSelecionada}">Excluir</button>
        </div>
      </div>
    </div>
  `).join('');

  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll('.btn-minus').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      const color = e.target.getAttribute('data-color');
      const currentQty = parseInt(e.target.nextElementSibling.textContent);
      if (currentQty > 1) {
        await updateQuantity(id, color, currentQty - 1);
        await renderCartItems();
      } else {
        if (confirm("Deseja remover este item da sacola?")) {
          await removeFromCart(id, color);
          await renderCartItems();
        }
      }
    });
  });

  document.querySelectorAll('.btn-plus').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      const color = e.target.getAttribute('data-color');
      const currentQty = parseInt(e.target.previousElementSibling.textContent);
      await updateQuantity(id, color, currentQty + 1);
      await renderCartItems();
    });
  });

  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      const color = e.target.getAttribute('data-color');
      await removeFromCart(id, color);
      await renderCartItems();
    });
  });
}

export function openCartDrawer() {
  injectCartHTML();
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  const closeBtn = document.getElementById('btn-close-cart');

  overlay.classList.add('open');
  drawer.classList.add('open');

  // Adicionar eventos de fechar se não houverem
  overlay.onclick = closeCartDrawer;
  if(closeBtn) closeBtn.onclick = closeCartDrawer;

  renderCartItems();
}

export function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay) overlay.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
}

// Injetar o HTML no carregamento da página mas manter escondido
document.addEventListener("DOMContentLoaded", () => {
    injectCartHTML();
});
