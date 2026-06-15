import { getOrders } from "../../checkout/services/checkoutServices.js";

export async function AdminOrdersComponent() {
  const orders = await getOrders();

  if (orders.length === 0) {
    return `
      <div class="empty-state">
        <i class="fas fa-box-open empty-icon"></i>
        <p>Nenhum pedido recebido até o momento.</p>
      </div>
    `;
  }

  // Ordenar por data decrescente
  orders.sort((a, b) => new Date(b.data) - new Date(a.data));

  const ordersHtml = orders.map(order => {
    const dataFormatada = new Date(order.data).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    
    const valorFormatado = order.totais.totalValue.toFixed(2).replace('.', ',');

    const itensPreview = order.itens.map(i => 
      `<span class="order-item-chip">${i.quantidade}x ${i.nome} (${i.corSelecionada})</span>`
    ).join('');

    return `
      <div class="admin-order-card">
        <div class="order-card-header">
          <div class="order-id">
            <i class="fas fa-hashtag"></i> ${order.id}
          </div>
          <div class="order-status badge-waiting">
            ${order.status}
          </div>
        </div>
        
        <div class="order-card-body">
          <div class="order-info-group">
            <span class="info-label">Cliente:</span>
            <span class="info-value">${order.cliente} ${order.email ? `(${order.email})` : ''}</span>
          </div>
          <div class="order-info-group">
            <span class="info-label">Data:</span>
            <span class="info-value">${dataFormatada}</span>
          </div>
          <div class="order-info-group">
            <span class="info-label">Itens:</span>
            <div class="order-items-list">
              ${itensPreview}
            </div>
          </div>
          <div class="order-info-group">
            <span class="info-label">Pagamento:</span>
            <span class="info-value payment-method">${order.formaPagamento.toUpperCase()}</span>
          </div>
        </div>
        
        <div class="order-card-footer">
          <div class="order-total">
            Total: R$ ${valorFormatado}
          </div>
          <button class="btn-order-action" disabled>Gerenciar Envio</button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="admin-orders-list">
      ${ordersHtml}
    </div>
  `;
}
