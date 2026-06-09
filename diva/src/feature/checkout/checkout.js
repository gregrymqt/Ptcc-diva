/* ================================================
   CHECKOUT.JS — Página de Finalização de Compra

   Este arquivo é responsável por TUDO que acontece
   na tela de checkout. Ele está dividido em 5 partes:

   1. Funções do pedido (criar e salvar no storage)
   2. Proteção de rota (só usuário logado pode acessar)
   3. Montar o HTML da tela com o formulário e resumo
   4. Comportamento do formulário (máscaras e envio)
   5. Inicialização da página ao carregar
   ================================================ */

import { navbarComponent }  from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }  from "../../shared/components/footer/footerComponent.js";
import { initNavbar }       from "../../shared/components/navbar/navbarController.js";
import { showToast }        from "../../shared/components/toast/toastComponent.js";
import { getStorageData, setStorageData } from "../../core/storage.js";
import { getCart, getCartTotals, clearCart } from "../cart/services/cartServices.js";


/* --------------------------------------------------
   PARTE 1: FUNÇÕES DE PEDIDO

   Cria e salva o pedido no localStorage
   após o usuário confirmar a compra.
   -------------------------------------------------- */

// Nome da chave onde os pedidos ficam salvos
var CHAVE_PEDIDOS = "pedidos";

/* Gera um código único para identificar o pedido.
   Exemplo de resultado: "PED-A3F9K2X1B" */
function gerarIdDoPedido() {
  return "PED-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

/* Retorna a lista de todos os pedidos já realizados. */
function buscarPedidos() {
  return getStorageData(CHAVE_PEDIDOS, []);
}

/* Cria e salva um novo pedido no localStorage.
   Recebe os dados de endereço e a forma de pagamento escolhida.
   Limpa o carrinho automaticamente após salvar. */
function criarPedido(dadosEntrega, formaPagamento) {
  var itensDoCarrinho = getCart();

  // Se o carrinho estiver vazio, não pode criar pedido
  if (itensDoCarrinho.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  var totais = getCartTotals();

  // Verifica se há um usuário logado para associar ao pedido
  var usuarioLogado = getStorageData("usuarioLogado");

  // Monta o objeto completo do pedido
  var novoPedido = {
    id:             gerarIdDoPedido(),
    data:           new Date().toISOString(),
    cliente:        usuarioLogado ? usuarioLogado.nome  : "Cliente Convidado",
    email:          usuarioLogado ? usuarioLogado.email : "",
    itens:          itensDoCarrinho,
    totais:         totais,
    dadosEntrega:   dadosEntrega,
    formaPagamento: formaPagamento,
    status:         "Aguardando Envio"
  };

  // Pega a lista de pedidos existentes e adiciona o novo
  var pedidos = buscarPedidos();
  pedidos.push(novoPedido);

  // Salva a lista atualizada de pedidos
  setStorageData(CHAVE_PEDIDOS, pedidos);

  // Esvazia o carrinho após o pedido ser registrado
  clearCart();

  return novoPedido;
}


/* --------------------------------------------------
   PARTE 2: PROTEÇÃO DE ROTA

   Verifica se o usuário está logado antes de
   mostrar a tela de checkout. Se não estiver,
   redireciona para o login.
   -------------------------------------------------- */

/* Verifica se tem um usuário logado no sistema.
   Se não tiver, exibe mensagem de erro e redireciona
   para o login após 2 segundos. */
function verificarLogin() {
  var usuarioLogado = getStorageData("usuarioLogado");

  if (!usuarioLogado) {
    // Mostra a mensagem de acesso negado no lugar do conteúdo
    var conteudo = document.getElementById("checkout-content");

    if (conteudo) {
      conteudo.innerHTML =
        '<div class="access-denied" style="text-align: center; padding: 5rem 2rem;">' +
          '<h2 style="font-family: var(--font-heading); color: var(--color-primary); margin-bottom: 1rem;">Acesso Negado</h2>' +
          '<p style="color: var(--color-text-light);">Redirecionando para o login...</p>' +
        '</div>';
    }

    showToast("Acesso restrito. Faça login para finalizar sua compra.", "error");

    // Aguarda 2 segundos e redireciona para o login
    setTimeout(function() {
      window.location.href = "../../auth/login/pages/index.html";
    }, 2000);

    // Retorna false para sinalizar que o usuário NÃO está logado
    return false;
  }

  // Retorna true para sinalizar que o usuário ESTÁ logado
  return true;
}


/* --------------------------------------------------
   PARTE 3: MONTAR O HTML DA TELA

   Lê os itens do carrinho e monta o HTML completo
   do checkout: formulário de entrega + resumo do pedido.
   -------------------------------------------------- */

/* Monta o HTML dos itens do carrinho para o resumo do pedido. */
function montarHtmlDosItens(itens) {
  // Se o carrinho estiver vazio, mostra uma mensagem
  if (itens.length === 0) {
    return '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
  }

  var html = "";

  // Percorre cada item e monta seu bloco de HTML
  for (var i = 0; i < itens.length; i++) {
    var item        = itens[i];
    var precoTotal  = (item.preco * item.quantidade).toFixed(2).replace(".", ",");

    html = html +
      '<div class="checkout-item">' +
        '<img src="' + item.imagem + '" alt="' + item.nome + '">' +
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

/* Monta e exibe todo o conteúdo da página de checkout:
   formulário de endereço, opções de pagamento e resumo do pedido. */
function renderizarCheckout() {
  var itens  = getCart();
  var totais = getCartTotals();

  var conteudo = document.getElementById("checkout-content");

  if (!conteudo) {
    return;
  }

  // Formata o valor total para exibição (ex: "149,80")
  var totalFormatado = totais.totalValue.toFixed(2).replace(".", ",");

  // Monta o HTML dos itens do carrinho
  var htmlItens = montarHtmlDosItens(itens);

  // Injeta o HTML completo do checkout na página
  conteudo.innerHTML =
    '<div class="checkout-layout">' +

      // --- Coluna 1: Formulário de Entrega e Pagamento ---
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

          // Campos de cartão (ficam escondidos até o usuário escolher "Cartão")
          '<div id="credit-card-fields" class="credit-card-fields hidden">' +
            '<div class="form-group">' +
              '<input type="text" placeholder="Número do Cartão" id="cc-num">' +
            '</div>' +
            '<div class="form-group row">' +
              '<input type="text" placeholder="Validade (MM/AA)" id="cc-val">' +
              '<input type="text" placeholder="CVV" id="cc-cvv">' +
            '</div>' +
          '</div>' +

          '<button type="submit" class="btn-checkout" disabled>Finalizar Pedido</button>' +
        '</form>' +
      '</section>' +

      // --- Coluna 2: Resumo do Pedido ---
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

  // Após montar o HTML, ativa os comportamentos do formulário
  iniciarComportamentosDoFormulario();
}


/* --------------------------------------------------
   PARTE 4: COMPORTAMENTOS DO FORMULÁRIO

   Adiciona máscaras nos campos e reage ao envio.
   -------------------------------------------------- */

/* Ativa todas as interações do formulário de checkout:
   - Mostrar/esconder campos do cartão
   - Máscara automática no CEP
   - Máscara automática no número do cartão
   - Envio do formulário e criação do pedido */
function iniciarComportamentosDoFormulario() {
  var campoCep      = document.getElementById("cep");
  var campoCartao   = document.getElementById("cc-num");
  var camposCartao  = document.getElementById("credit-card-fields");
  var formulario    = document.getElementById("checkout-form");
  var btnFinalizar  = formulario ? formulario.querySelector(".btn-checkout") : null;
  var itensCarrinho = getCart();

  // --- Mostrar/Esconder campos do cartão de crédito ---
  var opcoesRadio = document.querySelectorAll('input[name="pagamento"]');

  for (var i = 0; i < opcoesRadio.length; i++) {
    opcoesRadio[i].addEventListener("change", function() {
      if (this.value === "cartao") {
        // Usuário escolheu cartão: mostra os campos extras
        camposCartao.classList.remove("hidden");
      } else {
        // Usuário escolheu outro método: esconde os campos do cartão
        camposCartao.classList.add("hidden");
      }
    });
  }

  // --- Máscara automática no campo de CEP ---
  if (campoCep) {
    campoCep.addEventListener("input", function() {
      // Remove tudo que não é número
      var valor = this.value.replace(/\D/g, "");

      // Coloca o hífen após o 5º dígito (ex: 01310-100)
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");

      // Limita a 9 caracteres no máximo (XXXXX-XXX)
      this.value = valor.slice(0, 9);

      // Habilita o botão de finalizar apenas quando o CEP estiver completo
      if (btnFinalizar && itensCarrinho.length > 0) {
        if (this.value.length === 9) {
          btnFinalizar.disabled = false;
        } else {
          btnFinalizar.disabled = true;
        }
      }
    });
  }

  // --- Máscara automática no número do cartão de crédito ---
  if (campoCartao) {
    campoCartao.addEventListener("input", function() {
      // Remove tudo que não é número
      var valor = this.value.replace(/\D/g, "");

      // Adiciona um espaço a cada 4 dígitos (ex: 1234 5678 9012 3456)
      valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");

      // Limita a 19 caracteres (16 dígitos + 3 espaços)
      this.value = valor.slice(0, 19);
    });
  }

  // --- Envio do formulário ---
  if (formulario) {
    formulario.addEventListener("submit", function(evento) {
      evento.preventDefault();

      // Desabilita o botão para evitar cliques duplos
      if (btnFinalizar) {
        btnFinalizar.textContent = "Processando seu Pedido...";
        btnFinalizar.disabled    = true;
      }

      // Lê os dados de entrega preenchidos no formulário
      var dadosEntrega = {
        cep:     document.getElementById("cep").value,
        rua:     document.getElementById("rua").value,
        numero:  document.getElementById("numero").value,
        bairro:  document.getElementById("bairro").value,
        cidade:  document.getElementById("cidade").value
      };

      // Lê a forma de pagamento escolhida
      var opcaoMarcada  = document.querySelector('input[name="pagamento"]:checked');
      var formaPagamento = opcaoMarcada ? opcaoMarcada.value : "pix";

      // Tenta criar o pedido
      try {
        criarPedido(dadosEntrega, formaPagamento);

        showToast("Pedido realizado com sucesso!", "success");

        // Redireciona para a página inicial após 2 segundos
        setTimeout(function() {
          window.location.href = "../../../index.html";
        }, 2000);

      } catch (erro) {
        // Se ocorrer algum erro, exibe a mensagem e reabilita o botão
        showToast("Erro ao processar pedido: " + erro.message, "error");

        if (btnFinalizar) {
          btnFinalizar.textContent = "Finalizar Pedido";
          btnFinalizar.disabled    = false;
        }
      }
    });
  }
}


/* --------------------------------------------------
   PARTE 5: INICIALIZAÇÃO

   Ponto de partida: monta a página quando o
   arquivo é carregado pelo checkout.html.
   -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function() {
  // Coloca a navbar e o footer na tela
  var navbarEl = document.getElementById("navbar");
  if (navbarEl) {
    navbarEl.innerHTML = navbarComponent();
  }

  var footerEl = document.getElementById("footer");
  if (footerEl) {
    footerEl.innerHTML = footerComponent();
  }

  // Ativa os comportamentos da navbar (menu mobile, contador do carrinho)
  if (navbarEl) {
    initNavbar();
  }

  // Verifica se o usuário está logado antes de mostrar o checkout
  var usuarioEstaLogado = verificarLogin();

  // Só renderiza o conteúdo do checkout se o usuário estiver logado
  if (usuarioEstaLogado) {
    renderizarCheckout();
  }
});
