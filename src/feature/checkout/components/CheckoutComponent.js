export function CheckoutComponent(cartItems, totals) {
  var itemsHtml = "";

  if (cartItems.length === 0) {
    itemsHtml = "<p class=\"empty-cart-message\">Seu carrinho está vazio.</p>";
  } else {
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      var precoTotalItem = (item.preco * item.quantidade).toFixed(2).replace('.', ',');
      
      itemsHtml += "<div class=\"checkout-item\">\n" +
                   "  <img src=\"" + item.imagem + "\" alt=\"" + item.nome + "\">\n" +
                   "  <div class=\"checkout-item-details\">\n" +
                   "    <h4>" + item.nome + "</h4>\n" +
                   "    <p>Cor: " + item.corSelecionada + "</p>\n" +
                   "    <p>Qtd: " + item.quantidade + "</p>\n" +
                   "  </div>\n" +
                   "  <div class=\"checkout-item-price\">\n" +
                   "    R$ " + precoTotalItem + "\n" +
                   "  </div>\n" +
                   "</div>\n";
    }
  }

  var totalValueFormatted = totals.totalValue.toFixed(2).replace('.', ',');

  var html = "<div class=\"checkout-layout\">\n" +
             "  <!-- Coluna 1: Formulário de Entrega e Pagamento -->\n" +
             "  <section class=\"checkout-form-section\">\n" +
             "    <h2>Dados de Entrega</h2>\n" +
             "    <form id=\"checkout-form\">\n" +
             "      <div class=\"form-group row\">\n" +
             "        <div class=\"input-wrapper\">\n" +
             "          <label for=\"cep\">CEP</label>\n" +
             "          <input type=\"text\" id=\"cep\" name=\"cep\" placeholder=\"00000-000\" required>\n" +
             "        </div>\n" +
             "        <div class=\"input-wrapper\">\n" +
             "          <label for=\"rua\">Rua</label>\n" +
             "          <input type=\"text\" id=\"rua\" name=\"rua\" placeholder=\"Rua das Flores\" required>\n" +
             "        </div>\n" +
             "      </div>\n" +
             "      \n" +
             "      <div class=\"form-group row\">\n" +
             "        <div class=\"input-wrapper\">\n" +
             "          <label for=\"numero\">Número</label>\n" +
             "          <input type=\"text\" id=\"numero\" name=\"numero\" placeholder=\"123\" required>\n" +
             "        </div>\n" +
             "        <div class=\"input-wrapper\">\n" +
             "          <label for=\"bairro\">Bairro</label>\n" +
             "          <input type=\"text\" id=\"bairro\" name=\"bairro\" placeholder=\"Centro\" required>\n" +
             "        </div>\n" +
             "      </div>\n" +
             "      \n" +
             "      <div class=\"form-group\">\n" +
             "        <div class=\"input-wrapper\">\n" +
             "          <label for=\"cidade\">Cidade / Estado</label>\n" +
             "          <input type=\"text\" id=\"cidade\" name=\"cidade\" placeholder=\"São Paulo - SP\" required>\n" +
             "        </div>\n" +
             "      </div>\n" +
             "\n" +
             "      <h2 class=\"payment-title\">Forma de Pagamento</h2>\n" +
             "      <div class=\"payment-options\">\n" +
             "        <label class=\"payment-option\">\n" +
             "          <input type=\"radio\" name=\"pagamento\" value=\"pix\" checked>\n" +
             "          <span class=\"payment-label\">Pix</span>\n" +
             "        </label>\n" +
             "        <label class=\"payment-option\">\n" +
             "          <input type=\"radio\" name=\"pagamento\" value=\"cartao\">\n" +
             "          <span class=\"payment-label\">Cartão de Crédito</span>\n" +
             "        </label>\n" +
             "      </div>\n" +
             "\n" +
             "      <!-- Campos extras simulados para Cartão (ocultos por padrão) -->\n" +
             "      <div id=\"credit-card-fields\" class=\"credit-card-fields hidden\">\n" +
             "        <div class=\"form-group\">\n" +
             "          <input type=\"text\" placeholder=\"Número do Cartão\" id=\"cc-num\">\n" +
             "        </div>\n" +
             "        <div class=\"form-group row\">\n" +
             "          <input type=\"text\" placeholder=\"Validade (MM/AA)\" id=\"cc-val\">\n" +
             "          <input type=\"text\" placeholder=\"CVV\" id=\"cc-cvv\">\n" +
             "        </div>\n" +
             "      </div>\n" +
             "\n" +
             "      <button type=\"submit\" class=\"btn-checkout\" disabled>\n" +
             "        Finalizar Pedido\n" +
             "      </button>\n" +
             "    </form>\n" +
             "  </section>\n" +
             "\n" +
             "  <!-- Coluna 2: Resumo do Pedido -->\n" +
             "  <aside class=\"checkout-summary-section\">\n" +
             "    <h2>Resumo do Pedido</h2>\n" +
             "    <div class=\"checkout-items-container\">\n" +
             "      " + itemsHtml + "\n" +
             "    </div>\n" +
             "    <div class=\"checkout-totals\">\n" +
             "      <div class=\"totals-row\">\n" +
             "        <span>Subtotal</span>\n" +
             "        <span>R$ " + totalValueFormatted + "</span>\n" +
             "      </div>\n" +
             "      <div class=\"totals-row\">\n" +
             "        <span>Frete</span>\n" +
             "        <span>Grátis</span>\n" +
             "      </div>\n" +
             "      <div class=\"totals-row total-final\">\n" +
             "        <span>Total</span>\n" +
             "        <span>R$ " + totalValueFormatted + "</span>\n" +
             "      </div>\n" +
             "    </div>\n" +
             "  </aside>\n" +
             "\n" +
             "</div>";

  return html;
}
