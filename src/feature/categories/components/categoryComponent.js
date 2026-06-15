import { getCategories } from "../../categories/services/categoryService.js";

export function categoryComponent() {
  var categories = getCategories();

  if (categories.length === 0) {
    return '<section class="categories-section">' +
        '<h2>Categorias</h2>' +
        '<p>Nenhuma categoria cadastrada.</p>' +
      '</section>';
  }

  var htmlGrid = "";
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    htmlGrid += '<div class="category-card">' +
        '<img src="' + category.imagem + '" alt="' + category.nome + '">' +
        '<h3>' + category.nome + '</h3>' +
        '<p>' + category.descricao + '</p>' +
      '</div>';
  }

  return '<section class="categories-section">' +
      '<h2>Categorias</h2>' +
      '<div class="categories-grid">' +
        htmlGrid +
      '</div>' +
    '</section>';
}