/* =========================================================
   COMPONENT: categoryFormComponent.js
   Descrição: Gera a estrutura HTML moderna para a criação 
              de novas categorias no painel administrativo.
   ========================================================= */

export function categoryFormComponent() {
  return (
    '<div class="admin-section admin-form-wrapper">' +
    '<form id="category-form" class="admin-category-form">' +
      '<div class="form-header">' +
        '<h2>Nova Categoria</h2>' +
        '<p>Cadastre divisões de produtos para organizar sua loja virtual.</p>' +
      '</div>' +

      '<div class="form-grid-single">' +
        /* Campo do Nome da Categoria */
        '<div class="input-group">' +
          '<label for="nome">Nome da Categoria</label>' +
          '<input type="text" id="nome" placeholder="Ex: Maquiagem de Olhos, Skincare" required>' +
        '</div>' +

        /* Campo da Descrição */
        '<div class="input-group">' +
          '<label for="descricao">Descrição da Categoria</label>' +
          '<textarea id="descricao" placeholder="Descreva quais produtos fazem parte desta categoria..." required></textarea>' +
        '</div>' +

        /* Campo de Imagem de Capa (Upload) */
        '<div class="input-group">' +
          '<label for="imagem">Imagem da Categoria (Upload)</label>' +
          '<input type="file" id="imagem" accept="image/*" required>' +
          '<div class="preview-container" style="margin-top: 10px; display: none;" id="category-image-preview-container">' +
            '<img id="category-image-preview" src="" alt="Preview da Categoria" style="max-width: 100%; max-height: 200px; border-radius: 8px; object-fit: cover; border: 1px solid #ddd; padding: 4px;">' +
          '</div>' +
        '</div>' +

        /* Botão de Envio */
        '<button type="submit" class="btn-save-category">' +
          '<i class="fas fa-save"></i> Salvar Categoria' +
        '</button>' +
      '</div>' +
    '</form>' +
    '</div>'
  );
}