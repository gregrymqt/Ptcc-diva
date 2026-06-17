/**
 * Componente Burro (Dumb Component).
 * Boa Prática (Arquitetura de Componentes): Este componente não busca dados nem gerencia estados. 
 * Ele apenas recebe o array de categorias e retorna estritamente a marcação HTML.
 * @param {Array} categories Lista de objetos de categoria
 * @returns {string} String HTML
 */
export function categoryComponent(categories) {
  if (!categories || categories.length === 0) {
    return '<p class="empty-state">Nenhuma categoria encontrada.</p>';
  }

  var htmlGrid = "";
  
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    htmlGrid += '<article class="category-card">' +
        '<img src="' + category.imagem + '" alt="' + category.nome + '">' +
        '<div class="category-content">' +
          '<h3>' + category.nome + '</h3>' +
          '<p>' + category.descricao + '</p>' +
        '</div>' +
      '</article>';
  }

  return htmlGrid;
}