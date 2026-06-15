/* =========================================================
   CATEGORIES.JS — Página de Listagem de Categorias (Refatorada)
   
   Este arquivo monta a página que lista todas as categorias.
   Aplicada proteção visual para travar botões administrativos.
   ========================================================= */

import { getCategories } from "./services/categoryService.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar }      from "../../shared/components/navbar/navbarController.js";


/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();




/* --------------------------------------------------
   PARTE 2 E 3: BUSCAR CATEGORIAS E EXIBIR NA TELA
   -------------------------------------------------- */

/* Monta o HTML de cada categoria e gerencia os botões de controle do Admin */
function exibirCategorias(termoBusca) {
  if (termoBusca === undefined) {
    termoBusca = "";
  }

  var categorias  = getCategories();
  var container   = document.getElementById("categories-container");

  if (!container) {
    return;
  }

  // Limpa o grid de renderização anterior
  container.innerHTML = "";

  var termoMinusculo = termoBusca.toLowerCase();

  // Percorre o array usando o laço de repetição tradicional for
  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];
    var nomeMinusculo = cat.nome.toLowerCase();

    // Filtra pelo termo de busca digitado ou selecionado
    if (nomeMinusculo.indexOf(termoMinusculo) === -1) {
      continue;
    }



    // Concatena o card completo na div container do DOM
    container.innerHTML = container.innerHTML +
      '<article class="category-card">' +
        '<img src="' + cat.imagem + '" alt="' + cat.nome + '">' +
        '<div class="category-content">' +
          '<h3>' + cat.nome + '</h3>' +
          '<p>' + cat.descricao + '</p>' +
        '</div>' +
      '</article>';
  }


}

// Inicializa a renderização dos cards na tela
exibirCategorias();


/* Monta o HTML do dropdown de filtro de categorias */
function carregarFiltroDropdown() {
  var containerOpcoes = document.getElementById("filter-dropdown-list");
  var header = document.getElementById("filter-dropdown-header");
  var categorias = getCategories();

  if (!containerOpcoes || !header) return;

  containerOpcoes.innerHTML = "";

  // Opção Padrão (Todas)
  containerOpcoes.innerHTML = containerOpcoes.innerHTML +
    '<label class="dropdown-item">' +
      '<input type="radio" name="filterCategoryRadio" value="" data-nome="Todas as categorias" checked>' +
      'Todas as categorias' +
    '</label>';

  // Adiciona as categorias dinâmicas no filtro de rádio
  for (var i = 0; i < categorias.length; i++) {
    containerOpcoes.innerHTML = containerOpcoes.innerHTML +
      '<label class="dropdown-item">' +
        '<input type="radio" name="filterCategoryRadio" value="' + categorias[i].nome + '" data-nome="' + categorias[i].nome + '">' +
        categorias[i].nome +
      '</label>';
  }

  header.addEventListener("click", function() {
    containerOpcoes.classList.toggle("show");
  });

  var radios = document.getElementsByName("filterCategoryRadio");
  for (var j = 0; j < radios.length; j++) {
    radios[j].addEventListener("change", function() {
      var nomeSelecionado = this.getAttribute("data-nome");
      var valorFiltro = this.value;
      
      header.innerHTML = nomeSelecionado + " ▼";
      containerOpcoes.classList.remove("show");
      
      exibirCategorias(valorFiltro);
    });
  }
}

// Ativa as configurações finais da página
carregarFiltroDropdown();
initNavbar();