export function AdminOrdersComponent(orders) {
  if (orders.length === 0) {
    return '<div class="admin-section admin-list-wrapper"><div class="admin-empty-state" style="text-align: center; padding: 3rem 1rem; color: #777;"><i class="fas fa-box-open" style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 1rem; display:block;"></i><p style="font-size: 1.1rem; font-weight: 500; margin: 0;">Nenhum pedido recebido até o momento.</p></div></div>';
  }

  // Ordenar por data decrescente
  orders.sort(function(a, b) {
    return new Date(b.data) - new Date(a.data);
  });

  var ordersHtml = "";
  
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    var dataFormatada = new Date(order.data).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    
    var valorFormatado = order.totais.totalValue.toFixed(2).replace('.', ',');

    var itensPreview = "";
    for (var j = 0; j < order.itens.length; j++) {
      var item = order.itens[j];
      itensPreview += "<span class=\"order-item-chip\">" + item.quantidade + "x " + item.nome + " (" + item.corSelecionada + ")</span>";
    }

    var emailHtml = "";
    if (order.email) {
      emailHtml = " (" + order.email + ")";
    }

    ordersHtml += "<div class=\"admin-order-card\">\n" +
                  "  <div class=\"order-card-header\">\n" +
                  "    <div class=\"order-id\">\n" +
                  "      <i class=\"fas fa-hashtag\"></i> " + order.id + "\n" +
                  "    </div>\n" +
                  "    <div class=\"order-status badge-waiting\">\n" +
                  "      " + order.status + "\n" +
                  "    </div>\n" +
                  "  </div>\n" +
                  "  \n" +
                  "  <div class=\"order-card-body\">\n" +
                  "    <div class=\"order-info-group\">\n" +
                  "      <span class=\"info-label\">Cliente:</span>\n" +
                  "      <span class=\"info-value\">" + order.cliente + emailHtml + "</span>\n" +
                  "    </div>\n" +
                  "    <div class=\"order-info-group\">\n" +
                  "      <span class=\"info-label\">Data:</span>\n" +
                  "      <span class=\"info-value\">" + dataFormatada + "</span>\n" +
                  "    </div>\n" +
                  "    <div class=\"order-info-group\">\n" +
                  "      <span class=\"info-label\">Itens:</span>\n" +
                  "      <div class=\"order-items-list\">\n" +
                  "        " + itensPreview + "\n" +
                  "      </div>\n" +
                  "    </div>\n" +
                  "    <div class=\"order-info-group\">\n" +
                  "      <span class=\"info-label\">Pagamento:</span>\n" +
                  "      <span class=\"info-value payment-method\">" + order.formaPagamento.toUpperCase() + "</span>\n" +
                  "    </div>\n" +
                  "  </div>\n" +
                  "  \n" +
                  "  <div class=\"order-card-footer\">\n" +
                  "    <div class=\"order-total\">\n" +
                  "      Total: R$ " + valorFormatado + "\n" +
                  "    </div>\n" +
                  "    <button class=\"btn-order-action\" disabled>Gerenciar Envio</button>\n" +
                  "  </div>\n" +
                  "</div>\n";
  }

  return "<div class=\"admin-section admin-list-wrapper\">\n" +
         "  <div class=\"admin-orders-list\">\n" +
         "    " + ordersHtml + "\n" +
         "  </div>\n" +
         "</div>";
}
