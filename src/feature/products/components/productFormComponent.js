/* =========================================================
   COMPONENT: productFormComponent.js
   Descrição: Gera a estrutura HTML limpa e semântica do 
              formulário de cadastro de produtos.
   ========================================================= */

export function productFormComponent() {
  return (
    '<div class="admin-section admin-form-wrapper">' +
    '<form id="product-form" class="admin-product-form">' +
      '<div class="form-header">' +
        '<h2>Novo Produto</h2>' +
        '<p>Preencha os detalhes para publicar na loja virtual.</p>' +
      '</div>' +

      '<div class="form-grid">' +
        /* Coluna da Esquerda: Upload de Imagem Personalizado */
        '<div class="form-column image-upload-section">' +
          '<label class="upload-area" for="product-image-input">' +
            '<div id="upload-placeholder" class="upload-placeholder">' +
              '<i class="fas fa-cloud-upload-alt"></i>' +
              '<span>Toque para subir a foto</span>' +
              '<small>Formatos aceitos: JPG, PNG (Máx 300KB)</small>' +
            '</div>' +
            '<img id="product-image-preview" class="image-preview" src="" style="display:none;">' +
          '</label>' +
          '<input type="file" id="product-image-input" accept="image/*" required style="display:none;">' +
        '</div>' +

        /* Coluna da Direita: Informações de Cadastro */
        '<div class="form-column details-section">' +
          '<div class="input-group">' +
            '<label for="nome">Nome do Produto</label>' +
            '<input type="text" id="nome" placeholder="Ex: Batom Matte Velvet Rose" required>' +
          '</div>' +

          /* Linha com Preço e Categoria lado a lado */
          '<div class="input-row">' +
            '<div class="input-group flex-1">' +
              '<label for="preco">Preço (R$)</label>' +
              '<input type="number" id="preco" step="0.01" placeholder="0,00" required>' +
            '</div>' +
            
            '<div class="input-group flex-1">' +
              '<label>Categoria</label>' +
              '<div class="custom-dropdown" id="custom-category-dropdown">' +
                '<div class="dropdown-header" id="category-dropdown-header">Selecione ▼</div>' +
                '<div class="dropdown-list" id="category-dropdown-list">' +
                  '' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="input-group">' +
            '<label for="descricao">Descrição Detalhada</label>' +
            '<textarea id="descricao" placeholder="Descreva os principais benefícios, diferenciais e composição..." required></textarea>' +
          '</div>' +

          '<div class="input-row">' +
            '<div class="input-group flex-1">' +
              '<label for="modoUso">Modo de Uso</label>' +
              '<textarea id="modoUso" placeholder="Instruções de aplicação..."></textarea>' +
            '</div>' +

            '<div class="input-group flex-1">' +
              '<label for="ingredientes">Ingredientes</label>' +
              '<textarea id="ingredientes" placeholder="Composição química e ingredientes..."></textarea>' +
            '</div>' +
          '</div>' +

          '<button type="submit" class="btn-save-product">' +
            '<i class="fas fa-check"></i> Salvar e Publicar Produto' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</form>' +
    '</div>'
  );
}