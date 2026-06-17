/* =========================================================
   COMPONENT: productDetailComponent.js
   Descrição: Gera a estrutura HTML limpa e semântica da
              página de detalhes do produto.
   ========================================================= */

export function productDetailComponent(produto, htmlSwatches, precoFormatado) {
  var imagemInicial    = produto.imagem || "https://via.placeholder.com/600x600?text=Sem+Imagem";
  var corInicial       = "Única";
  var temVariacoes     = produto.variacoes && produto.variacoes.length > 0;

  if (temVariacoes) {
    imagemInicial = produto.variacoes[0].imagem || imagemInicial;
    corInicial    = produto.variacoes[0].cor || corInicial;
  }

  var nomeCategoria   = produto.categoryName || "Produto";
  var modoUso         = produto.modoUso || "Consulte a embalagem do produto.";
  var ingredientes    = produto.ingredientes || "Não informado.";

  return (
    '<section class="pdp-section">' +
      '<div class="pdp-container">' +

        // --- Galeria de Imagens ---
        '<div class="pdp-gallery">' +
          '<img id="pdp-main-image" src="' + imagemInicial + '" alt="' + produto.nome + '" class="pdp-image" loading="eager">' +
        '</div>' +

        // --- Informações do Produto ---
        '<div class="pdp-details">' +
          '<span class="pdp-category">' + nomeCategoria + '</span>' +
          '<h1 class="pdp-title">' + produto.nome + '</h1>' +
          '<p class="pdp-price">' + precoFormatado + '</p>' +

          '<div class="pdp-description-box">' +
            '<p>' + produto.descricao + '</p>' +
          '</div>' +

          // --- Seleção de Cores ---
          '<div class="pdp-variations">' +
            '<h3 class="variation-label">Cor selecionada: <span id="pdp-selected-color">' + corInicial + '</span></h3>' +
            '<div class="swatch-container">' +
              htmlSwatches +
            '</div>' +
          '</div>' +

          // --- Botões de Ação ---
          '<div class="pdp-actions">' +
            '<button class="btn-add-cart" id="btn-add-cart">Adicionar à Sacola</button>' +
            '<button class="btn-wishlist" aria-label="Adicionar aos favoritos">❤</button>' +
          '</div>' +

          // --- Abas de Informação Adicional ---
          '<div class="pdp-accordion">' +
            '<details class="accordion-item" open>' +
              '<summary class="accordion-header">Modo de Uso</summary>' +
              '<div class="accordion-body"><p>' + modoUso + '</p></div>' +
            '</details>' +
            '<details class="accordion-item">' +
              '<summary class="accordion-header">Ingredientes</summary>' +
              '<div class="accordion-body"><p>' + ingredientes + '</p></div>' +
            '</details>' +
          '</div>' +

        '</div>' +
      '</div>' +
    '</section>'
  );
}
