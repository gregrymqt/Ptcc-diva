/* =========================================================
   CATEGORIES.JS — Página de Listagem de Categorias (Refatorada)
   
   Este arquivo monta a página que lista todas as categorias.
   Aplicada proteção visual para travar botões administrativos.
   ========================================================= */

import { getCategories } from "./services/categoryService.js";
import { categoryComponent } from "./components/categoryComponent.js";
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

/**
 * Monta o HTML das categorias na tela.
 * Boa Prática (Lógica de Filtro Front-End): O filtro de busca (termoBusca)
 * manipula arrays diretamente na memória do navegador. Para aplicações pequenas,
 * isso economiza idas ao banco de dados ou backend, aumentando a velocidade.
 */
function exibirCategorias(termoBusca) {
  if (termoBusca === undefined) {
    termoBusca = "";
  }

  // 1. Acesso aos Dados através do Service (SoC)
  var categorias  = getCategories();
  var container   = document.getElementById("categories-container");

  if (!container) {
    return;
  }

  // Limpa o grid de renderização anterior
  container.innerHTML = "";

  var termoMinusculo = termoBusca.toLowerCase();
  var categoriasFiltradas = [];

  // 2. Aplicação de Filtros em Memória
  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];
    var nomeMinusculo = cat.nome.toLowerCase();

    // Filtra pelo termo de busca digitado ou selecionado
    if (nomeMinusculo.indexOf(termoMinusculo) !== -1) {
      categoriasFiltradas.push(cat);
    }
  }

  // 3. Renderização final através de Componente (SoC)
  // Boa Prática: O Javascript não escreve HTML solto; ele apenas passa 
  // os dados para o componente "burro" fazer o trabalho.
  container.innerHTML = categoryComponent(categoriasFiltradas);
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