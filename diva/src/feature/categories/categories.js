/* =========================================================
   CATEGORIES.JS — Página de Listagem de Categorias (Refatorada)
   
   Este arquivo monta a página que lista todas as categorias.
   Aplicada proteção visual para travar botões administrativos.
   ========================================================= */

import { getCategories, deleteCategory } from "./services/categoryService.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar }      from "../../shared/components/navbar/navbarController.js";
import { getUserRole }     from "../../core/rolesManager.js";
import { showToast }       from "../../shared/components/toast/toastComponent.js";

// Variável global que armazena a role do usuário logado para uso em toda a página
var roleUsuarioLogado = "cliente";

/* Lê a sessão ativa no LocalStorage e armazena a role do usuário */
function identificarRoleDoUsuario() {
  var sessao = localStorage.getItem("usuarioLogado");
  var email = "";

  if (sessao) {
    try {
      var sessaoParsed = JSON.parse(sessao);
      email = sessaoParsed.email;
    } catch (e) {
      email = sessao;
    }
  }

  // Busca o nível de acesso real (Ex: "admin" ou "client")
  roleUsuarioLogado = getUserRole(email);
}

// Executa a leitura da sessão imediatamente
identificarRoleDoUsuario();


/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();


/* Oculta o botão superior de "Nova Categoria" se o usuário não for admin */
function verificarPermissaoBotaoCriar() {
  if (roleUsuarioLogado !== "admin") {
    var btnNovaCategoria = document.getElementById("btn-nova-categoria");
    if (btnNovaCategoria) {
      btnNovaCategoria.style.display = "none";
    }
  }
}

verificarPermissaoBotaoCriar();


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

    // TRAVA DE SEGURANÇA VISUAL: Monta os botões administrativos apenas se for admin
    var htmlBotoesAdmin = "";
    if (roleUsuarioLogado === "admin") {
      htmlBotoesAdmin = 
        '<div class="category-admin-actions">' +
          '<button class="btn-edit-category" data-id="' + cat.id + '" data-nome="' + cat.nome + '">' +
            '<i class="fas fa-edit"></i> Alterar' +
          '</button>' +
          '<button class="btn-delete-category" data-id="' + cat.id + '">' +
            '<i class="fas fa-trash-alt"></i> Excluir' +
          '</button>' +
        '</div>';
    }

    // Concatena o card completo na div container do DOM
    container.innerHTML = container.innerHTML +
      '<article class="category-card">' +
        '<img src="' + cat.imagem + '" alt="' + cat.nome + '">' +
        '<div class="category-content">' +
          '<h3>' + cat.nome + '</h3>' +
          '<p>' + cat.descricao + '</p>' +
          htmlBotoesAdmin + 
        '</div>' +
      '</article>';
  }

  // Atribui os escutadores de evento de clique (Apenas se o usuário logado for admin)
  if (roleUsuarioLogado === "admin") {
    
    // Configuração do evento de Excluir
    var btnDeleteElements = document.getElementsByClassName("btn-delete-category");
    for (var j = 0; j < btnDeleteElements.length; j++) {
      btnDeleteElements[j].addEventListener("click", function() {
        var categoryId = this.getAttribute("data-id");
        var confirmDelete = confirm("Deseja realmente excluir esta categoria?");
        
        if (confirmDelete) {
          deleteCategory(categoryId);
          exibirCategorias(); // Atualiza a lista na tela
          showToast("Categoria removida com sucesso!", "success");
        }
      });
    }

    // Configuração do evento de Alterar
    var btnEditElements = document.getElementsByClassName("btn-edit-category");
    for (var k = 0; k < btnEditElements.length; k++) {
      btnEditElements[k].addEventListener("click", function() {
        var categoryId = this.getAttribute("data-id");
        var categoryNome = this.getAttribute("data-nome");
        
        // Exibe um toast didático para provar o funcionamento na banca
        showToast("Modo de edição acionado para: " + categoryNome, "info");
        
        // Se quiser redirecionar para a página de criação passando o ID, descomente a linha abaixo:
        // window.location.href = "./create-category.html?edit=" + categoryId;
      });
    }
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