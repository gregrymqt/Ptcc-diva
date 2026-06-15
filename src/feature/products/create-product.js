/* ================================================
   CREATE-PRODUCT.JS — Painel de Administração

   Página exclusiva para administradores.
   Permite cadastrar novos produtos e ver os
   pedidos recebidos (Painel Admin).

   Dividido em:
   1. Proteção de rota
   2. Montagem da página (Navbar, Footer, Abas)
   3. Formulário de criação de produto
   4. Listagem de pedidos
   ================================================ */

import { protectAdminPage }  from "../../core/rolesManager.js";
import { navbarComponent }   from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }   from "../../shared/components/footer/footerComponent.js";
import { initNavbar }        from "../../shared/components/navbar/navbarController.js";
import { getCategories }     from "../categories/services/categoryService.js";
import { createProduct }     from "./services/productServices.js";
import { getOrders }         from "../checkout/services/checkoutServices.js";
import { showToast }         from "../../shared/components/toast/toastComponent.js";
import { productFormComponent } from "./components/productFormComponent.js";


/* --------------------------------------------------
   PARTE 1: PROTEÇÃO DE ROTA
   Bloqueia quem não for admin antes de carregar a tela.
   -------------------------------------------------- */
protectAdminPage();


/* --------------------------------------------------
   PARTE 2: MONTAGEM DA PÁGINA (NAVBAR E ABAS)
   -------------------------------------------------- */

/* Preenche as categorias no dropdown de radios. */
function carregarCategoriasNoSelect() {
  var containerOpcoes = document.getElementById("category-dropdown-list");
  var categorias = getCategories();

  if (!containerOpcoes) {
    return;
  }

  // Limpa opções anteriores
  containerOpcoes.innerHTML = "";

  // Cria as opções como radios
  for (var i = 0; i < categorias.length; i++) {
    containerOpcoes.innerHTML = containerOpcoes.innerHTML +
      '<label class="dropdown-item">' +
        '<input type="radio" name="categoryRadio" value="' + categorias[i].id + '" data-nome="' + categorias[i].nome + '">' +
        categorias[i].nome +
      '</label>';
  }

  var header = document.getElementById("category-dropdown-header");
  
  // Abre e fecha o dropdown ao clicar no cabeçalho
  if (header) {
    header.addEventListener("click", function() {
      containerOpcoes.classList.toggle("show");
    });
  }

  // Captura os cliques nos rádios para atualizar o texto do cabeçalho
  var radios = document.getElementsByName("categoryRadio");
  for (var j = 0; j < radios.length; j++) {
    radios[j].addEventListener("change", function() {
      var nomeSelecionado = this.getAttribute("data-nome");
      if (header) {
        header.innerHTML = nomeSelecionado + " ▼";
      }
      // Fecha a lista assim que escolhe
      containerOpcoes.classList.remove("show");
    });
  }
}

/* Configura as abas do painel (Produto vs Pedidos). */
function iniciarAbas() {
  var botoesAba = document.querySelectorAll(".tab-btn");
  var conteudosAba = document.querySelectorAll(".tab-content");

  for (var i = 0; i < botoesAba.length; i++) {
    botoesAba[i].addEventListener("click", function() {
      // Tira a classe 'active' de todos os botões e conteúdos
      for (var j = 0; j < botoesAba.length; j++) {
        botoesAba[j].classList.remove("active");
        conteudosAba[j].classList.remove("active");
      }

      // Coloca 'active' no botão clicado
      this.classList.add("active");

      // Mostra o conteúdo correspondente
      var idAlvo = this.getAttribute("data-target");
      document.getElementById(idAlvo).classList.add("active");

      // Se o usuário clicou em "Pedidos", carrega a lista
      if (idAlvo === "tab-pedidos") {
        renderizarPedidos();
      }
    });
  }
}


/* --------------------------------------------------
   PARTE 3: FORMULÁRIO DE CRIAR PRODUTO
   -------------------------------------------------- */

// Variável global para guardar a imagem convertida em Base64
var imagemBase64 = "";

/* Configura a pré-visualização da imagem no formulário. */
/* No seu create-product.js, atualize a lógica do preview: */

function iniciarUploadDeImagem() {
  var inputImagem = document.getElementById("product-image-input");
  var previewImagem = document.getElementById("product-image-preview");
  var placeholder = document.getElementById("upload-placeholder"); // ADICIONADO

  if (!inputImagem) return;

  inputImagem.addEventListener("change", function(evento) {
    var arquivo = evento.target.files[0];
    if (!arquivo) return;

    var leitor = new FileReader();
    leitor.onload = function(e) {
      imagemBase64 = e.target.result;
      
      if (previewImagem) {
        previewImagem.src = imagemBase64;
        previewImagem.style.display = "block";
        if (placeholder) placeholder.style.display = "none"; // ESCONDE O ÍCONE
      }
    };
    leitor.readAsDataURL(arquivo);
  });
}

/* Configura o comportamento do formulário de salvar. */
function iniciarFormulario() {
  var formulario = document.getElementById("product-form");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    // Lê todos os dados preenchidos
    var nome         = document.getElementById("nome").value;
    var preco        = document.getElementById("preco").value;
    var descricao    = document.getElementById("descricao").value;
    var modoUso      = document.getElementById("modoUso") ? document.getElementById("modoUso").value : "";
    var ingredientes = document.getElementById("ingredientes") ? document.getElementById("ingredientes").value : "";

    // Pega o rádio selecionado para a categoria
    var radioSelecionado = document.querySelector('input[name="categoryRadio"]:checked');
    if (!radioSelecionado) {
      showToast("Por favor, selecione uma categoria.", "error");
      return;
    }
    var categoryId = radioSelecionado.value;

    // Se não tiver imagem, usa um placeholder genérico
    var imagemFinal = imagemBase64;

    if (!imagemFinal || imagemFinal === "") {
      imagemFinal = "https://via.placeholder.com/600x600?text=Sem+Imagem";
    }

    // Monta o objeto do produto
    var novoProduto = {
      id:           Date.now(), // Será substituído pelo service
      nome:         nome,
      preco:        Number(preco),
      descricao:    descricao,
      imagem:       imagemFinal,
      categoryId:   Number(categoryId),
      variacoes:    [], // Por padrão, cria sem variações (MVP)
      modoUso:      modoUso,
      ingredientes: ingredientes
    };

    // Salva o produto
    createProduct(novoProduto);

    // Limpa o formulário e a tela
    formulario.reset();

    // Reseta o cabeçalho do dropdown
    var header = document.getElementById("category-dropdown-header");
    if (header) {
      header.innerHTML = "Selecione uma categoria ▼";
    }

    var previewImagem = document.getElementById("product-image-preview");

    if (previewImagem) {
      previewImagem.style.display = "none";
      previewImagem.src = "";
    }

    imagemBase64 = "";

    showToast("Produto cadastrado com sucesso!", "success");
  });
}


/* --------------------------------------------------
   PARTE 4: LISTAGEM DE PEDIDOS (ADMIN ORDERS)

   Exibe os pedidos que os clientes fizeram.
   -------------------------------------------------- */

/* Pega a lista de pedidos, monta o HTML e coloca na tela. */
function renderizarPedidos() {
  var container = document.getElementById("admin-orders-container");

  if (!container) {
    return;
  }

  var pedidos = getOrders();

  // Se não houver pedidos, mostra uma mensagem elegante
  if (pedidos.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<i class="fas fa-box-open empty-icon"></i>' +
        '<p>Nenhum pedido recebido até o momento.</p>' +
      '</div>';
    return;
  }

  // Ordena os pedidos para que o mais recente fique no topo
  pedidos.sort(function(a, b) {
    var dataA = new Date(a.data).getTime();
    var dataB = new Date(b.data).getTime();
    return dataB - dataA;
  });

  var htmlCompleto = "";

  // Percorre cada pedido e monta o HTML do seu "card"
  for (var i = 0; i < pedidos.length; i++) {
    var pedido = pedidos[i];

    // Formata a data (ex: 15/10/2026, 14:30)
    var dataFormatada = new Date(pedido.data).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

    // Formata o valor
    var valorFormatado = pedido.totais.totalValue.toFixed(2).replace(".", ",");

    // Monta uma string rápida com todos os itens daquele pedido
    var textoItens = "";

    for (var j = 0; j < pedido.itens.length; j++) {
      var item = pedido.itens[j];
      textoItens = textoItens +
        '<span class="order-item-chip">' +
          item.quantidade + 'x ' + item.nome + ' (' + item.corSelecionada + ')' +
        '</span>';
    }

    // Se houver e-mail, coloca entre parênteses
    var textoEmail = "";
    if (pedido.email && pedido.email !== "") {
      textoEmail = " (" + pedido.email + ")";
    }

    // Concatena o HTML do card do pedido
    htmlCompleto = htmlCompleto +
      '<div class="admin-order-card">' +
        '<div class="order-card-header">' +
          '<div class="order-id"><i class="fas fa-hashtag"></i> ' + pedido.id + '</div>' +
          '<div class="order-status badge-waiting">' + pedido.status + '</div>' +
        '</div>' +

        '<div class="order-card-body">' +
          '<div class="order-info-group">' +
            '<span class="info-label">Cliente:</span>' +
            '<span class="info-value">' + pedido.cliente + textoEmail + '</span>' +
          '</div>' +
          '<div class="order-info-group">' +
            '<span class="info-label">Data:</span>' +
            '<span class="info-value">' + dataFormatada + '</span>' +
          '</div>' +
          '<div class="order-info-group">' +
            '<span class="info-label">Itens:</span>' +
            '<div class="order-items-list">' + textoItens + '</div>' +
          '</div>' +
          '<div class="order-info-group">' +
            '<span class="info-label">Pagamento:</span>' +
            '<span class="info-value payment-method">' + pedido.formaPagamento.toUpperCase() + '</span>' +
          '</div>' +
        '</div>' +

        '<div class="order-card-footer">' +
          '<div class="order-total">Total: R$ ' + valorFormatado + '</div>' +
          '<button class="btn-order-action" disabled>Gerenciar Envio</button>' +
        '</div>' +
      '</div>';
  }

  // Joga tudo na tela
  container.innerHTML =
    '<div class="admin-orders-list">' +
      htmlCompleto +
    '</div>';
}


/* --------------------------------------------------
   INICIALIZAÇÃO

   Monta a página quando tudo estiver pronto.
   -------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function() {
  // Monta navbar e footer
  document.getElementById("navbar").innerHTML = navbarComponent();
  document.getElementById("footer").innerHTML = footerComponent();
  initNavbar();

  // Monta form de produto
  var formContainer = document.getElementById("product-form-container");
  if (formContainer) {
    formContainer.innerHTML = productFormComponent();
  }

  // Configura a tela de criação
  carregarCategoriasNoSelect();
  iniciarUploadDeImagem();
  iniciarFormulario();

  // Configura a navegação por abas
  iniciarAbas();
});