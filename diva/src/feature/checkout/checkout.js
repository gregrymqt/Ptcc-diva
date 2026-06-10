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

var CHAVE_CARRINHO = "carrinho";
var CHAVE_PEDIDOS  = "pedidos";

/* --------------------------------------------------
   PARTE 1: FUNÇÕES DE LEITURA E PEDIDO
   -------------------------------------------------- */
function pegarCarrinhoLocal() {
  return getStorageData(CHAVE_CARRINHO, []);
}

function calcularTotalLocal() {
  var carrinho = pegarCarrinhoLocal();
  var total = 0;

  for (var i = 0; i < carrinho.length; i++) {
    total = total + (carrinho[i].preco * carrinho[i].quantidade);
  }
  return total;
}

function limparCarrinhoLocal() {
  setStorageData(CHAVE_CARRINHO, []);
  window.dispatchEvent(new Event("cartUpdated"));
}

function gerarIdDoPedido() {
  return "PED-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function criarPedido(dadosEntrega, formaPagamento) {
  var itensDoCarrinho = pegarCarrinhoLocal();

  if (itensDoCarrinho.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  var valorTotal = calcularTotalLocal();
  var usuarioLogado = getStorageData("usuarioLogado");

  var novoPedido = {
    id:             gerarIdDoPedido(),
    data:           new Date().toISOString(),
    cliente:        usuarioLogado ? usuarioLogado.nome  : "Cliente Convidado",
    email:          usuarioLogado ? usuarioLogado.email : "",
    itens:          itensDoCarrinho,
    total:          valorTotal,
    dadosEntrega:   dadosEntrega,
    formaPagamento: formaPagamento,
    status:         "Aguardando Envio"
  };

  var pedidos = getStorageData(CHAVE_PEDIDOS, []);
  pedidos.push(novoPedido);
  setStorageData(CHAVE_PEDIDOS, pedidos);

  limparCarrinhoLocal();
  return novoPedido;
}

/* --------------------------------------------------
   PARTE 2: PROTEÇÃO DE ROTA
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
   PARTE 3: MONTAR O HTML DA TELA (RENDER)
   -------------------------------------------------- */
function montarHtmlDosItens(itens) {
  if (itens.length === 0) {
    return '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
  }

  var html = "";
  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    var precoTotal = (item.preco * item.quantidade).toFixed(2).replace(".", ",");

    html = html +
      '<div class="checkout-item">' +
        '<img src="' + item.imagem + '" alt="' + item.nome + '" onerror="this.src=\'https://via.placeholder.com/150?text=Diva+Makeup\'">' +
        '<div class="checkout-item-details">' +
          '<h4>' + item.nome + '</h4>' +
          '<p>Cor: ' + item.corSelecionada + '</p>' +
          '<p>Qtd: ' + item.quantidade + '</p>' +
        '</div>' +
        '<div class="checkout-item-price">' +
          'R$ ' + precoTotal +
        '</div>' +
      '</div>';
  }
  return html;
}

function renderizarCheckout() {
  var itens = pegarCarrinhoLocal();
  var total = calcularTotalLocal();
  var conteudo = document.getElementById("checkout-content");

  if (!conteudo) {
    return;
  }

  var totalFormatado = total.toFixed(2).replace(".", ",");
  var htmlItens = montarHtmlDosItens(itens);

  conteudo.innerHTML =
    '<div class="checkout-layout">' +
      '<section class="checkout-form-section">' +
        '<h2>Dados de Entrega</h2>' +
        '<form id="checkout-form">' +
          '<div class="form-group row">' +
            '<div class="input-wrapper">' +
              '<label for="cep">CEP</label>' +
              '<input type="text" id="cep" name="cep" placeholder="00000-000" required>' +
            '</div>' +
            '<div class="input-wrapper">' +
              '<label for="rua">Rua</label>' +
              '<input type="text" id="rua" name="rua" placeholder="Rua das Flores" required>' +
            '</div>' +
          '</div>' +
          '<div class="form-group row">' +
            '<div class="input-wrapper">' +
              '<label for="numero">Número</label>' +
              '<input type="text" id="numero" name="numero" placeholder="123" required>' +
            '</div>' +
            '<div class="input-wrapper">' +
              '<label for="bairro">Bairro</label>' +
              '<input type="text" id="bairro" name="bairro" placeholder="Centro" required>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="input-wrapper">' +
              '<label for="cidade">Cidade / Estado</label>' +
              '<input type="text" id="cidade" name="cidade" placeholder="São Paulo - SP" required>' +
            '</div>' +
          '</div>' +
          '<h2 class="payment-title">Forma de Pagamento</h2>' +
          '<div class="payment-options">' +
            '<label class="payment-option">' +
              '<input type="radio" name="pagamento" value="pix" checked>' +
              '<span class="payment-label">Pix</span>' +
            '</label>' +
            '<label class="payment-option">' +
              '<input type="radio" name="pagamento" value="cartao">' +
              '<span class="payment-label">Cartão de Crédito</span>' +
            '</label>' +
          '</div>' +
          '<div id="credit-card-fields" class="credit-card-fields hidden">' +
            '<div class="form-group">' +
              '<input type="text" placeholder="Número do Cartão" id="cc-num">' +
            '</div>' +
            '<div class="form-group row">' +
              '<input type="text" placeholder="Validade (MM/AA)" id="cc-val">' +
              '<input type="text" placeholder="CVV" id="cc-cvv">' +
            '</div>' +
          '</div>' +
          '<button type="submit" class="btn-checkout" disabled><i class="fas fa-lock"></i> Finalizar Pedido</button>' +
        '</form>' +
      '</section>' +
      '<aside class="checkout-summary-section">' +
        '<h2>Resumo do Pedido</h2>' +
        '<div class="checkout-items-container">' +
          htmlItens +
        '</div>' +
        '<div class="checkout-totals">' +
          '<div class="totals-row">' +
            '<span>Subtotal</span>' +
            '<span>R$ ' + totalFormatado + '</span>' +
          '</div>' +
          '<div class="totals-row">' +
            '<span>Frete</span>' +
            '<span>Grátis</span>' +
          '</div>' +
          '<div class="totals-row total-final">' +
            '<span>Total</span>' +
            '<span>R$ ' + totalFormatado + '</span>' +
          '</div>' +
        '</div>' +
      '</aside>' +
    '</div>';

  iniciarComportamentosDoFormulario();
}

/* --------------------------------------------------
   PARTE 4: COMPORTAMENTOS E VALIDAÇÃO
   -------------------------------------------------- */
function iniciarComportamentosDoFormulario() {
  var campoCep      = document.getElementById("cep");
  var campoCartao   = document.getElementById("cc-num");
  var camposCartao  = document.getElementById("credit-card-fields");
  var formulario    = document.getElementById("checkout-form");
  var btnFinalizar  = formulario ? formulario.querySelector(".btn-checkout") : null;
  var itensCarrinho = pegarCarrinhoLocal();

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

      try {
        criarPedido(dadosEntrega, formaPagamento);
        showToast("Pedido realizado com sucesso!", "success");

        setTimeout(function() {
          window.location.href = "../../../index.html";
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
   PARTE 5: INICIALIZAÇÃO
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