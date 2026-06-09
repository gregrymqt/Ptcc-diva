/* ================================================
   NAVBARCONTROLLER.JS — Comportamento da Navbar

   Este arquivo adiciona a lógica interativa à
   navbar que já foi criada pelo navbarComponent.js.

   Ele cuida de:
   - Abrir/fechar o menu hambúrguer no mobile
   - Abrir a gaveta do carrinho ao clicar no ícone
   - Atualizar o contador de itens no carrinho e favoritos
   ================================================ */

import { getCartTotals }   from "../../../feature/cart/services/cartServices.js";
import { openCartDrawer }  from "../../../feature/cart/components/CartDrawerComponent.js";
import { getFavorites }    from "../../../feature/favorites/services/favoriteService.js";
import { getUserRole }     from "../../../core/rolesManager.js";

/* Inicializa todos os comportamentos da navbar.
   Deve ser chamada após o HTML da navbar ser inserido na página. */
export function initNavbar() {
  // Configura a autenticação (Entrar / Sair)
  configurarMenuAutenticacao();

  // Configura os Dropdowns dinâmicos para administradores
  configurarDropdownsAdmin();

  // Pega os elementos do menu hambúrguer (versão mobile)
  var toggle = document.getElementById("menuToggle");
  var menu   = document.getElementById("navbarMenu");

  // Se o botão do menu existir, ativa o toggle de abrir/fechar
  if (toggle && menu) {
    toggle.addEventListener("click", function() {
      menu.classList.toggle("active");
    });
  }

  // Pega o botão do carrinho na navbar
  var botaoCarrinho = document.querySelector(".navbar__button");

  if (botaoCarrinho) {
    botaoCarrinho.addEventListener("click", function(e) {
      // Impede que o link do botão redirecione para outra página
      e.preventDefault();

      // Abre a gaveta lateral do carrinho
      openCartDrawer();
    });
  }

  // Atualiza os contadores (carrinho e favoritos) ao carregar
  atualizarContadores();

  // Toda vez que o carrinho for atualizado, atualiza os contadores
  window.addEventListener("cartUpdated", function() {
    atualizarContadores();
  });
}

/* Atualiza os números de quantidade exibidos na navbar
   (ex: "Carrinho (3)" e "Favoritos (2)"). */
export function atualizarContadores() {
  var contadorCarrinho  = document.getElementById("cart-count");
  var contadorFavoritos = document.getElementById("favorites-count");

  // Atualiza o contador do carrinho se o elemento existir na tela
  if (contadorCarrinho) {
    var totais = getCartTotals();
    contadorCarrinho.textContent = "(" + totais.totalItems + ")";
  }

  // Atualiza o contador de favoritos se o elemento existir na tela
  if (contadorFavoritos) {
    var favoritos = getFavorites();

    if (favoritos) {
      contadorFavoritos.textContent = "(" + favoritos.length + ")";
    } else {
      contadorFavoritos.textContent = "(0)";
    }
  }
}

/* ================================================
   Configuração de Autenticação na Navbar
   Exibe dinamicamente Entrar (deslogado) ou Sair (logado)
   ================================================ */
export function configurarMenuAutenticacao() {
  var authContainer = document.getElementById("navbar-auth-container");
  
  // Se o contentor não existir na página, não faz nada
  if (!authContainer) {
    return;
  }
  
  // Verifica no localStorage se existe um utilizador logado
  var usuarioLogado = localStorage.getItem("usuarioLogado");
  
  if (usuarioLogado) {
    // Utilizador está logado
    // Injeta o link de Sair dentro do contentor
    authContainer.innerHTML = '<a href="#" id="navbar-logout-btn">Sair</a>';
    
    // Captura o link recém-criado e adiciona a ação de clique
    var btnLogout = document.getElementById("navbar-logout-btn");
    if (btnLogout) {
      btnLogout.addEventListener("click", function(e) {
        // Evita que a página seja recarregada pelo link
        e.preventDefault();
        
        // Remove os dados do utilizador da sessão local
        localStorage.removeItem("usuarioLogado");
        
        // Redireciona o utilizador de volta para a página inicial
        window.location.href = "../../home/pages/home.html";
      });
    }
  } else {
    // Utilizador NÃO está logado
    // Injeta o link de Entrar que redireciona para a página de Login
    authContainer.innerHTML = '<a href="../../auth/pages/login.html" id="navbar-login-btn">Entrar</a>';
  }
}

/* ================================================
   Configuração de Dropdowns para Administradores
   Transforma links normais em dropdowns apenas para admins
   ================================================ */
export function configurarDropdownsAdmin() {
  // 1. Verifica se existe um utilizador logado através do localStorage
  var usuarioLogado = localStorage.getItem("usuarioLogado");
  
  // Se não estiver logado, não há nada a alterar (mantém links normais)
  if (!usuarioLogado) {
    return;
  }
  
  // 2. Verifica a "role" do utilizador atual com base no seu identificador (ex: email)
  // Utilizamos a função importada do sistema de controlo de acessos
  var roleAtual = getUserRole(usuarioLogado);
  
  // Se o utilizador não for Administrador, mantemos o comportamento padrão (não há dropdowns)
  if (roleAtual !== "admin") {
    return;
  }
  
  // 3. Captura os contêineres HTML que preparámos no componente da Navbar
  var containerProdutos = document.getElementById("nav-item-products");
  var containerCategorias = document.getElementById("nav-item-categories");
  
  // 4. Injeta o novo HTML com os gatilhos e os sub-menus de Produtos
  if (containerProdutos) {
    containerProdutos.innerHTML = 
      '<a href="#" class="dropdown-trigger" id="trigger-products">Produtos ▾</a>' +
      '<div class="dropdown-menu" id="menu-products">' +
        '<a href="../../products/pages/products.html">Ver Produtos</a>' +
        '<a href="../../products/pages/create-product.html">Cadastrar Produto</a>' +
      '</div>';
      
    // Adiciona evento de clique para abrir/fechar este menu
    var triggerProducts = document.getElementById("trigger-products");
    var menuProducts = document.getElementById("menu-products");
    
    if (triggerProducts && menuProducts) {
      triggerProducts.addEventListener("click", function(e) {
        e.preventDefault(); // Impede salto da página para o topo
        menuProducts.classList.toggle("is-open"); // Adiciona ou remove a classe que mostra o menu
      });
    }
  }
  
  // 5. Injeta o novo HTML com os gatilhos e os sub-menus de Categorias
  if (containerCategorias) {
    containerCategorias.innerHTML = 
      '<a href="#" class="dropdown-trigger" id="trigger-categories">Categorias ▾</a>' +
      '<div class="dropdown-menu" id="menu-categories">' +
        '<a href="../../categories/pages/categories.html">Ver Categorias</a>' +
        '<a href="../../categories/pages/create-category.html">Cadastrar Categoria</a>' +
      '</div>';
      
    // Adiciona evento de clique para abrir/fechar este menu
    var triggerCategories = document.getElementById("trigger-categories");
    var menuCategories = document.getElementById("menu-categories");
    
    if (triggerCategories && menuCategories) {
      triggerCategories.addEventListener("click", function(e) {
        e.preventDefault(); // Impede salto da página para o topo
        menuCategories.classList.toggle("is-open"); // Adiciona ou remove a classe que mostra o menu
      });
    }
  }
}