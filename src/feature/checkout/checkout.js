/* =========================================================
   CHECKOUT.JS — Página de Finalização de Compra (Refatorada)
   
   Garante funcionamento total sem travar ou sumir com estilos.
   Padrão estrito de "Refatoração Reversa" mantido.
   ========================================================= */

import { navbarComponent }  from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }  from "../../shared/components/footer/footerComponent.js";
import { initNavbar }       from "../../shared/components/navbar/navbarController.js";
import { showToast }        from "../../shared/components/toast/toastComponent.js";
import { getStorageData, setStorageData } from "../../core/storage.js";
import { CheckoutComponent } from "./components/CheckoutComponent.js";
import { createOrder } from "./services/checkoutServices.js";
import { getCart, getCartTotals, clearCart } from "../../cart/services/cartService.js";

/* --------------------------------------------------
   PARTE 1: PROTEÇÃO DE ROTA
   -------------------------------------------------- */
function verificarLogin() {
  var usuarioLogado = getStorageData("usuarioLogado");

  if (!usuarioLogado) {
    var conteudo = document.getElementById("checkout-content");
    if (conteudo) {
      conteudo.innerHTML =
        '<div class="access-denied" style="text-align: center; padding: 5rem 2rem;">' +
          '<h2 style="color: #b34d68; margin-bottom: 1rem;">Acesso Negado</h2>' +
          '<p>Redirecionando para a página de login...</p>' +
        '</div>';
    }

    showToast("Acesso restrito. Faça login para finalizar sua compra.", "error");

    setTimeout(function() {
      window.location.href = "../../auth/pages/login.html";
    }, 2000);

    return false;
  }
  return true;
}

/* --------------------------------------------------
   PARTE 2: MONTAR O HTML DA TELA (RENDER)
   -------------------------------------------------- */
function renderizarCheckout() {
  var itens = getCart();
  var totais = getCartTotals();
  var total = totais.totalValue;
  var conteudo = document.getElementById("checkout-content");

  if (!conteudo) {
    return;
  }

  var totaisObjeto = { totalValue: total };

  conteudo.innerHTML = CheckoutComponent(itens, totaisObjeto);

  iniciarComportamentosDoFormulario();
}

/* --------------------------------------------------
   PARTE 3: COMPORTAMENTOS E VALIDAÇÃO
   -------------------------------------------------- */
function iniciarComportamentosDoFormulario() {
  var campoCep      = document.getElementById("cep");
  var campoCartao   = document.getElementById("cc-num");
  var camposCartao  = document.getElementById("credit-card-fields");
  var formulario    = document.getElementById("checkout-form");
  var btnFinalizar  = formulario ? formulario.querySelector(".btn-checkout") : null;
  var itensCarrinho = getCart();

  var opcoesRadio = document.querySelectorAll('input[name="pagamento"]');
  for (var i = 0; i < opcoesRadio.length; i++) {
    opcoesRadio[i].addEventListener("change", function() {
      if (this.value === "cartao") {
        camposCartao.classList.remove("hidden");
      } else {
        camposCartao.classList.add("hidden");
      }
    });
  }

  if (campoCep) {
    campoCep.addEventListener("input", function() {
      // Boa Prática: Expressão Regular (Regex) limpa qualquer coisa que não seja número
      var valor = this.value.replace(/\D/g, "");
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
      this.value = valor.slice(0, 9);

      if (btnFinalizar && itensCarrinho.length > 0) {
        if (this.value.length === 9) {
          btnFinalizar.disabled = false;
        } else {
          btnFinalizar.disabled = true;
        }
      }
    });
  }

  if (campoCartao) {
    campoCartao.addEventListener("input", function() {
      var valor = this.value.replace(/\D/g, "");
      valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
      this.value = valor.slice(0, 19);
    });
  }

  if (formulario) {
    formulario.addEventListener("submit", function(evento) {
      evento.preventDefault();

      if (btnFinalizar) {
        btnFinalizar.textContent = "Processando seu Pedido...";
        btnFinalizar.disabled = true;
      }

      var dadosEntrega = {
        cep:    document.getElementById("cep").value,
        rua:    document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value
      };

      var opcaoMarcada = document.querySelector('input[name="pagamento"]:checked');
      var formaPagamento = opcaoMarcada ? opcaoMarcada.value : "pix";

      // Boa Prática (Tratamento de Erros): O bloco try/catch intercepta falhas (ex: disco cheio) 
      // e garante que a tela não fique "congelada", destravando o botão para o usuário e 
      // exibindo uma mensagem de alerta.
      try {
        var carrinho = getCart();
        var totais = getCartTotals();
        var usuarioLogado = getStorageData("usuarioLogado");

        createOrder(dadosEntrega, formaPagamento, carrinho, totais.totalValue, usuarioLogado);
        clearCart();
        
        showToast("Pedido realizado com sucesso!", "success");

        setTimeout(function() {
          window.location.href = window.location.origin + "/src/feature/home/pages/home.html";
        }, 2000);

      } catch (erro) {
        showToast("Erro ao processar pedido: " + erro.message, "error");
        if (btnFinalizar) {
          btnFinalizar.innerHTML = "<i class='fas fa-lock'></i> Finalizar Pedido";
          btnFinalizar.disabled = false;
        }
      }
    });
  }
}

/* --------------------------------------------------
   PARTE 4: INICIALIZAÇÃO
   -------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function() {
  var navbarEl = document.getElementById("navbar");
  if (navbarEl) {
    navbarEl.innerHTML = navbarComponent();
  }

  var footerEl = document.getElementById("footer");
  if (footerEl) {
    footerEl.innerHTML = footerComponent();
  }

  if (navbarEl) {
    initNavbar();
  }

  var usuarioEstaLogado = verificarLogin();

  if (usuarioEstaLogado) {
    renderizarCheckout();
  }
});