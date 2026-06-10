/* =========================================================
   COMPONENT: categoryFormComponent.js
   Descrição: Gera a estrutura HTML moderna para a criação 
              de novas categorias no painel administrativo.
   ========================================================= */

export function categoryFormComponent() {
  return (
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

        /* Campo da URL da Imagem de Capa */
        '<div class="input-group">' +
          '<label for="imagem">Link da Imagem (Capa)</label>' +
          '<input type="url" id="imagem" placeholder="https://exemplo.com/imagem.jpg" required>' +
        '</div>' +

        /* Botão de Envio */
        '<button type="submit" class="btn-save-category">' +
          '<i class="fas fa-save"></i> Salvar Categoria' +
        '</button>' +
      '</div>' +
    '</form>'
  );
}