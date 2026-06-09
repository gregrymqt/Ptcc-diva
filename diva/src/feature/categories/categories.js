/* ================================================
   CATEGORIES.JS — Página de Listagem de Categorias

   Este arquivo monta a página que lista todas as
   categorias cadastradas na loja.

   Ele está dividido em 3 partes:
   1. Montar a navbar e o footer
   2. Buscar as categorias do localStorage
   3. Exibir cada categoria na tela
   ================================================ */

import { getCategories, deleteCategory } from "./services/categoryService.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar }      from "../../shared/components/navbar/navbarController.js";
import { getUserRole }     from "../../core/rolesManager.js";


/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();

/* --------------------------------------------------
   CONTROLE DE ACESSO
   Oculta o botão de "Nova Categoria" se o usuário não for admin.
   -------------------------------------------------- */
function verificarPermissaoAdmin() {
  var sessao = localStorage.getItem("usuarioLogado");
  var email;

  // Tenta ler o e-mail, podendo ser JSON ou texto simples
  if (sessao) {
    try {
      var sessaoParsed = JSON.parse(sessao);
      email = sessaoParsed.email;
    } catch (e) {
      email = sessao;
    }
  }

  // Busca a role atual usando a função do rolesManager
  var roleAtual = getUserRole(email);

  // Se não for admin (ou se não estiver logado), esconde o botão
  if (roleAtual !== "admin") {
    var btnNovaCategoria = document.getElementById("btn-nova-categoria");
    if (btnNovaCategoria) {
      btnNovaCategoria.style.display = "none";
    }
  }
}

// Executa a checagem logo que o script carrega
verificarPermissaoAdmin();


/* --------------------------------------------------
   PARTE 2 E 3: BUSCAR CATEGORIAS E EXIBIR NA TELA

   Lê as categorias salvas e insere os cards
   dentro da div#categories-container.
   -------------------------------------------------- */

/* Monta o HTML de cada categoria e coloca na tela.
   Aceita um termo de busca opcional para filtrar a lista. */
function exibirCategorias(termoBusca) {
  // Se não houver termo, define como texto vazio para facilitar
  if (termoBusca === undefined) {
    termoBusca = "";
  }

  var categorias  = getCategories();
  var container   = document.getElementById("categories-container");

  if (!container) {
    return;
  }

  // Limpa o conteúdo anterior
  container.innerHTML = "";

  // Converte o termo de busca para minúsculas
  var termoMinusculo = termoBusca.toLowerCase();

  // Percorre cada categoria e monta seu card HTML
  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];

    // Verifica se a busca atual está contida no nome da categoria
    var nomeMinusculo = cat.nome.toLowerCase();
    if (nomeMinusculo.indexOf(termoMinusculo) === -1) {
      // Se não encontrou o texto, pula para o próximo item do loop
      continue;
    }

    container.innerHTML = container.innerHTML +
      '<article class="category-card">' +
        '<img src="' + cat.imagem + '" alt="' + cat.nome + '">' +
        '<div class="category-content">' +
          '<h3>' + cat.nome + '</h3>' +
          '<p>' + cat.descricao + '</p>' +
          '<button class="btn-delete-category" data-id="' + cat.id + '">Excluir</button>' +
        '</div>' +
      '</article>';
  }

  // Captura os cliques dos botões de excluir
  var btnDeleteElements = document.getElementsByClassName("btn-delete-category");
  for (var j = 0; j < btnDeleteElements.length; j++) {
    btnDeleteElements[j].addEventListener("click", function() {
      var categoryId = this.getAttribute("data-id");
      var confirmDelete = confirm("Deseja realmente excluir esta categoria?");
      if (confirmDelete) {
        deleteCategory(categoryId);
        exibirCategorias();
      }
    });
  }
}

exibirCategorias();

/* Monta o HTML do dropdown de filtro de categorias */
function carregarFiltroDropdown() {
  var containerOpcoes = document.getElementById("filter-dropdown-list");
  var header = document.getElementById("filter-dropdown-header");
  var categorias = getCategories();

  if (!containerOpcoes || !header) return;

  // Limpa o conteúdo
  containerOpcoes.innerHTML = "";

  // Opção "Todas"
  containerOpcoes.innerHTML = containerOpcoes.innerHTML +
    '<label class="dropdown-item">' +
      '<input type="radio" name="filterCategoryRadio" value="" data-nome="Todas as categorias" checked>' +
      'Todas as categorias' +
    '</label>';

  // Preenche as outras categorias
  for (var i = 0; i < categorias.length; i++) {
    containerOpcoes.innerHTML = containerOpcoes.innerHTML +
      '<label class="dropdown-item">' +
        '<input type="radio" name="filterCategoryRadio" value="' + categorias[i].nome + '" data-nome="' + categorias[i].nome + '">' +
        categorias[i].nome +
      '</label>';
  }

  // Toggle dropdown
  header.addEventListener("click", function() {
    containerOpcoes.classList.toggle("show");
  });

  // Evento change nos radios
  var radios = document.getElementsByName("filterCategoryRadio");
  for (var j = 0; j < radios.length; j++) {
    radios[j].addEventListener("change", function() {
      var nomeSelecionado = this.getAttribute("data-nome");
      var valorFiltro = this.value;
      
      header.innerHTML = nomeSelecionado + " ▼";
      containerOpcoes.classList.remove("show");
      
      // Reutilizamos a função de busca passando o valor do rádio!
      exibirCategorias(valorFiltro);
    });
  }
}

// Preenche o dropdown de filtro assim que possível
carregarFiltroDropdown();

// Ativa os comportamentos da navbar (menu mobile, contador)
initNavbar();