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
  
  // Verifica no localStorage se existe um usuário logado
  var usuarioLogadoStr = localStorage.getItem("usuarioLogado");
  
  if (usuarioLogadoStr) {
    // O usuário está logado
    
    // Obter email para verificar role
    var email;
    try {
      /* Boa Prática (Programação Defensiva): O JSON.parse pode falhar se o dado 
         no localStorage for manipulado manualmente de forma incorreta. 
         O try/catch previne a quebra da tela (White Screen of Death). */
      var usuarioParsed = JSON.parse(usuarioLogadoStr);
      email = usuarioParsed.email || usuarioLogadoStr;
    } catch (e) {
      email = usuarioLogadoStr;
    }

    var role = getUserRole(email);

    if (role === "admin") {
      // Injeta o Dropdown para Admin
      authContainer.innerHTML = 
        '<div class="nav-dropdown-wrapper">' +
          '<a href="#" class="dropdown-trigger" id="navbar-admin-trigger">Admin ▾</a>' +
          '<div class="dropdown-menu" id="navbar-admin-menu">' +
            '<a href="../../admin/pages/admin.html">Painel Admin</a>' +
            '<a href="#" id="navbar-logout-btn">Sair</a>' +
          '</div>' +
        '</div>';

      // Configura toggle do dropdown
      var triggerAdmin = document.getElementById("navbar-admin-trigger");
      var menuAdmin = document.getElementById("navbar-admin-menu");
      
      if (triggerAdmin && menuAdmin) {
        triggerAdmin.addEventListener("click", function(e) {
          e.preventDefault();
          menuAdmin.classList.toggle("is-open");
        });
      }
    } else {
      // Injeta apenas o link de Sair para usuário comum
      authContainer.innerHTML = '<a href="#" id="navbar-logout-btn">Sair</a>';
    }
    
    // Captura o link de Sair e adiciona a ação de clique
    var btnLogout = document.getElementById("navbar-logout-btn");
    if (btnLogout) {
      btnLogout.addEventListener("click", function(e) {
        // Evita que a página seja recarregada pelo link
        e.preventDefault();
        
        // Remove os dados do usuário da sessão local
        localStorage.removeItem("usuarioLogado");
        
        // Redireciona o usuário de volta para a página inicial
        window.location.href = "../../home/pages/home.html";
        showToast("Logout realizado com sucesso!");
        
      });
    }
  } else {
    // O usuário NÃO está logado
    // Injeta o link de Entrar que redireciona para a página de Login
    authContainer.innerHTML = '<a href="../../auth/pages/login.html" id="navbar-login-btn">Entrar</a>';
  }
}
