export function CheckoutComponent(cartItems, totals) {
  const itemsHtml = cartItems.length === 0 
    ? `<p class="empty-cart-message">Seu carrinho está vazio.</p>`
    : cartItems.map(item => `
      <div class="checkout-item">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="checkout-item-details">
          <h4>${item.nome}</h4>
          <p>Cor: ${item.corSelecionada}</p>
          <p>Qtd: ${item.quantidade}</p>
        </div>
        <div class="checkout-item-price">
          R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
        </div>
      </div>
    `).join('');

  const totalValueFormatted = totals.totalValue.toFixed(2).replace('.', ',');

  return `
    <div class="checkout-layout">
      
      <!-- Coluna 1: Formulário de Entrega e Pagamento -->
      <section class="checkout-form-section">
        <h2>Dados de Entrega</h2>
        <form id="checkout-form">
          <div class="form-group row">
            <div class="input-wrapper">
              <label for="cep">CEP</label>
              <input type="text" id="cep" name="cep" placeholder="00000-000" required>
            </div>
            <div class="input-wrapper">
              <label for="rua">Rua</label>
              <input type="text" id="rua" name="rua" placeholder="Rua das Flores" required>
            </div>
          </div>
          
          <div class="form-group row">
            <div class="input-wrapper">
              <label for="numero">Número</label>
              <input type="text" id="numero" name="numero" placeholder="123" required>
            </div>
            <div class="input-wrapper">
              <label for="bairro">Bairro</label>
              <input type="text" id="bairro" name="bairro" placeholder="Centro" required>
            </div>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <label for="cidade">Cidade / Estado</label>
              <input type="text" id="cidade" name="cidade" placeholder="São Paulo - SP" required>
            </div>
          </div>

          <h2 class="payment-title">Forma de Pagamento</h2>
          <div class="payment-options">
            <label class="payment-option">
              <input type="radio" name="pagamento" value="pix" checked>
              <span class="payment-label">Pix</span>
            </label>
            <label class="payment-option">
              <input type="radio" name="pagamento" value="cartao">
              <span class="payment-label">Cartão de Crédito</span>
            </label>
          </div>

          <!-- Campos extras simulados para Cartão (ocultos por padrão) -->
          <div id="credit-card-fields" class="credit-card-fields hidden">
            <div class="form-group">
              <input type="text" placeholder="Número do Cartão" id="cc-num">
            </div>
            <div class="form-group row">
              <input type="text" placeholder="Validade (MM/AA)" id="cc-val">
              <input type="text" placeholder="CVV" id="cc-cvv">
            </div>
          </div>

          <button type="submit" class="btn-checkout" ${cartItems.length === 0 ? 'disabled' : ''}>
            Finalizar Pedido
          </button>
        </form>
      </section>

      <!-- Coluna 2: Resumo do Pedido -->
      <aside class="checkout-summary-section">
        <h2>Resumo do Pedido</h2>
        <div class="checkout-items-container">
          ${itemsHtml}
        </div>
        <div class="checkout-totals">
          <div class="totals-row">
            <span>Subtotal</span>
            <span>R$ ${totalValueFormatted}</span>
          </div>
          <div class="totals-row">
            <span>Frete</span>
            <span>Grátis</span>
          </div>
          <div class="totals-row total-final">
            <span>Total</span>
            <span>R$ ${totalValueFormatted}</span>
          </div>
        </div>
      </aside>

    </div>
  `;
}
