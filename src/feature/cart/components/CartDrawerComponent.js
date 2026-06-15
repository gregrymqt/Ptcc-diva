/* ================================================
   CARTDRAWERCOMPONENT.JS — Gaveta do Carrinho

   Este arquivo controla a "gaveta" (drawer) do
   carrinho que aparece do lado direito da tela
   quando o usuário clica no ícone do carrinho
   na navbar.

   Ele está dividido em 5 partes:
   1. Funções que lêem e modificam o carrinho
   2. Função que injeta o HTML da gaveta na página
   3. Função que formata o preço em Reais
   4. Função que renderiza os itens dentro da gaveta
   5. Funções de abrir e fechar a gaveta
   ================================================ */

import { getStorageData, setStorageData } from "../../../core/storage.js";


/* --------------------------------------------------
   PARTE 1: FUNÇÕES DO CARRINHO
   Lêem e salvam os dados do carrinho no localStorage.
   A chave usada é "carrinho".
   -------------------------------------------------- */

// Nome da chave onde o carrinho fica salvo no navegador
var CHAVE_CARRINHO = "carrinho";

/* Lê e retorna todos os itens do carrinho.
   Se não houver nada salvo, retorna uma lista vazia. */
function pegarCarrinho() {
  return getStorageData(CHAVE_CARRINHO, []);
}

/* Salva a lista completa de itens no localStorage
   e avisa outros componentes que o carrinho mudou. */
function salvarCarrinho(itens) {
  setStorageData(CHAVE_CARRINHO, itens);

  // Dispara um aviso para que a navbar atualize o número de itens
  window.dispatchEvent(new Event("cartUpdated"));
}

/* Adiciona um produto ao carrinho.
   Se o produto com a mesma cor já estiver lá, apenas aumenta a quantidade.
   Recebe o objeto do produto completo e a cor selecionada pelo usuário. */
export function addToCart(produto, corSelecionada) {
  var carrinho = pegarCarrinho();

  // Verifica se esse produto com essa cor já está no carrinho
  var itemExistente = null;
  var indiceExistente = -1;

  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === produto.id && carrinho[i].corSelecionada === corSelecionada) {
      itemExistente = carrinho[i];
      indiceExistente = i;
    }
  }

  if (indiceExistente !== -1) {
    // Se já existe, só aumenta a quantidade
    carrinho[indiceExistente].quantidade = carrinho[indiceExistente].quantidade + 1;
  } else {
    // Se não existe, monta um novo item e adiciona no carrinho

    // Tenta encontrar a imagem da variação de cor selecionada
    var imagemDoProduto = "https://via.placeholder.com/600x600?text=Sem+Imagem";

    if (produto.variacoes) {
      for (var v = 0; v < produto.variacoes.length; v++) {
        if (produto.variacoes[v].cor === corSelecionada) {
          imagemDoProduto = produto.variacoes[v].imagem;
        }
      }
    }

    var novoItem = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: imagemDoProduto,
      corSelecionada: corSelecionada,
      quantidade: 1
    };

    carrinho.push(novoItem);
  }

  salvarCarrinho(carrinho);
}

/* Atualiza la quantidade de um item específico no carrinho.
   Recebe o id do produto, a cor e a nova quantidade desejada. */
function atualizarQuantidade(produtoId, cor, novaQuantidade) {
  // Não permite quantidade menor que 1
  if (novaQuantidade < 1) {
    return;
  }

  var carrinho = pegarCarrinho();

  for (var i = 0; i < carrinho.length; i++) {
    /* CORREÇÃO DIDÁTICA: Alterado de '===' para '==' para que o JavaScript
       consiga comparar o ID vindo do HTML (que é texto) com o ID vindo do
       banco/localStorage (que pode ser um número). */
    if (carrinho[i].id == produtoId && carrinho[i].corSelecionada === cor) {
      carrinho[i].quantidade = novaQuantidade;
    }
  }

  salvarCarrinho(carrinho);
}

/* Remove um item completamente do carrinho pelo id e cor. */
function removerDoCarrinho(produtoId, cor) {
  var carrinho = pegarCarrinho();
  var carrinhoAtualizado = [];

  // Mantém apenas os itens que NÃO são o que queremos remover
  for (var i = 0; i < carrinho.length; i++) {
    /* CORREÇÃO DIDÁTICA: Usamos '==' aqui também para garantir que o ID em formato
       de texto lido do botão remova corretamente o ID numérico do localStorage. */
    var mesmoId = carrinho[i].id == produtoId;
    var mesmaCor = carrinho[i].corSelecionada === cor;

    if (!(mesmoId && mesmaCor)) {
      carrinhoAtualizado.push(carrinho[i]);
    }
  }

  salvarCarrinho(carrinhoAtualizado);
}

/* Calcula e retorna o total de itens e o valor total do carrinho. */
function calcularTotais() {
  var carrinho = pegarCarrinho();
  var totalItens = 0;
  var totalValor = 0;

  for (var i = 0; i < carrinho.length; i++) {
    totalItens = totalItens + carrinho[i].quantidade;
    totalValor = totalValor + (carrinho[i].preco * carrinho[i].quantidade);
  }

  return { totalItens: totalItens, totalValor: totalValor };
}

/* Esvazia completamente o carrinho. */
export function clearCart() {
  setStorageData(CHAVE_CARRINHO, []);
  window.dispatchEvent(new Event("cartUpdated"));
}


/* --------------------------------------------------
   PARTE 2: MONTAR O HTML DA GAVETA NA PÁGINA
   -------------------------------------------------- */

function injetarHTMLdaGaveta() {
  if (document.getElementById("cart-drawer-overlay")) {
    return;
  }

  var html =
    '<div id="cart-drawer-overlay" class="cart-overlay"></div>' +
    '<div id="cart-drawer" class="cart-drawer">' +
    '<div class="cart-header">' +
    '<h2>Sua Sacola</h2>' +
    '<button id="btn-close-cart" class="btn-close-cart" aria-label="Fechar carrinho">&times;</button>' +
    '</div>' +
    '<div id="cart-body" class="cart-body">' +
    '' +
    '</div>' +
    '<div class="cart-footer">' +
    '<div class="cart-subtotal">' +
    '<span>Subtotal:</span>' +
    '<span id="cart-subtotal-value">R$ 0,00</span>' +
    '</div>' +
    '<button class="btn-checkout">Finalizar Compra</button>' +
    '</div>' +
    '</div>';

  document.body.insertAdjacentHTML("beforeend", html);
}


/* --------------------------------------------------
   PARTE 3: FORMATAÇÃO DE PREÇO
   -------------------------------------------------- */

function formatarPreco(preco) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(preco);
}


/* --------------------------------------------------
   PARTE 4: RENDERIZAR OS ITENS NA GAVETA
   -------------------------------------------------- */

export function renderCartItems() {
  var cartBody = document.getElementById("cart-body");
  var subtotalEl = document.getElementById("cart-subtotal-value");

  if (!cartBody || !subtotalEl) {
    return;
  }

  var carrinho = pegarCarrinho();
  var totais = calcularTotais();

  subtotalEl.textContent = formatarPreco(totais.totalValor);

  var btnFinalizar = document.querySelector("#cart-drawer .btn-checkout");

  if (btnFinalizar) {
    if (carrinho.length === 0) {
      btnFinalizar.disabled = true;
    } else {
      btnFinalizar.disabled = false;
    }
  }

  if (carrinho.length === 0) {
    cartBody.innerHTML =
      '<div class="cart-empty">' +
      '<h3>Sua sacola está vazia</h3>' +
      '<button id="btn-continue-shopping" class="btn-continue">Continuar Comprando</button>' +
      '</div>';

    var btnContinuar = document.getElementById("btn-continue-shopping");

    if (btnContinuar) {
      btnContinuar.addEventListener("click", closeCartDrawer);
    }

    return;
  }

  var htmlItens = "";

  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];

    htmlItens = htmlItens +
      '<div class="cart-item">' +
      '<img src="' + item.imagem + '" alt="' + item.nome + '" class="cart-item-image">' +
      '<div class="cart-item-details">' +
      '<h4 class="cart-item-title">' + item.nome + '</h4>' +
      '<span class="cart-item-color">Cor: ' + item.corSelecionada + '</span>' +
      '<span class="cart-item-price">' + formatarPreco(item.preco) + '</span>' +
      '<div class="cart-item-actions">' +
      '<div class="quantity-controls">' +
      '<button class="btn-qty btn-minus" data-id="' + item.id + '" data-color="' + item.corSelecionada + '">-</button>' +
      '<span class="qty-value">' + item.quantidade + '</span>' +
      '<button class="btn-qty btn-plus"  data-id="' + item.id + '" data-color="' + item.corSelecionada + '">+</button>' +
      '</div>' +
      '<button class="btn-remove" data-id="' + item.id + '" data-color="' + item.corSelecionada + '">Excluir</button>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  cartBody.innerHTML = htmlItens;

  registrarEventosDosItens();
}

function registrarEventosDosItens() {
  var botoesMenos = document.querySelectorAll(".btn-minus");

  for (var i = 0; i < botoesMenos.length; i++) {
    botoesMenos[i].addEventListener("click", function () {
      this.disabled = true;

      var id = this.getAttribute("data-id");
      var cor = this.getAttribute("data-color");
      var quantidadeAtual = parseInt(this.nextElementSibling.textContent);

      if (quantidadeAtual > 1) {
        atualizarQuantidade(id, cor, quantidadeAtual - 1);
        renderCartItems();
      } else {
        if (confirm("Deseja remover este item da sacola?")) {
          removerDoCarrinho(id, cor);
          renderCartItems();
        } else {
          this.disabled = false;
        }
      }
    });
  }

  var botoesMais = document.querySelectorAll(".btn-plus");

  for (var j = 0; j < botoesMais.length; j++) {
    botoesMais[j].addEventListener("click", function () {
      this.disabled = true;

      var id = this.getAttribute("data-id");
      var cor = this.getAttribute("data-color");
      var quantidadeAtual = parseInt(this.previousElementSibling.textContent);

      atualizarQuantidade(id, cor, quantidadeAtual + 1);
      renderCartItems();
    });
  }

  var botoesExcluir = document.querySelectorAll(".btn-remove");

  for (var k = 0; k < botoesExcluir.length; k++) {
    botoesExcluir[k].addEventListener("click", function () {
      this.disabled = true;

      var id = this.getAttribute("data-id");
      var cor = this.getAttribute("data-color");

      removerDoCarrinho(id, cor);
      renderCartItems();
    });
  }
}


/* --------------------------------------------------
   PARTE 5: ABRIR E FECHAR A GAVETA
   -------------------------------------------------- */

export function openCartDrawer() {
  injetarHTMLdaGaveta();

  var overlay = document.getElementById("cart-drawer-overlay");
  var gaveta = document.getElementById("cart-drawer");
  var btnFechar = document.getElementById("btn-close-cart");
  
  /* ADIÇÃO DIDÁTICA: Captura o botão de Finalizar Compra do rodapé da gaveta */
  var btnFinalizar = document.querySelector("#cart-drawer .btn-checkout");

  overlay.classList.add("open");
  gaveta.classList.add("open");

  overlay.onclick = closeCartDrawer;
  if (btnFechar) {
    btnFechar.onclick = closeCartDrawer;
  }

  /* ADIÇÃO DIDÁTICA: Cria o evento de clique para o botão "Finalizar Compra"
     utilizando uma rota dinâmica absoluta baseada no servidor local. */
  if (btnFinalizar) {
    btnFinalizar.onclick = function() {
      // Monta o endereço absoluto partindo da raiz do servidor (ex: http://127.0.0.1:5500)
      // Isso impede que a rota quebre independentemente de qual página o usuário esteja abrindo o carrinho.
      var urlCheckout = window.location.origin + "/diva/src/feature/checkout/pages/checkout.html";
      
      // Realiza o redirecionamento de tela
      window.location.href = urlCheckout;
    };
  }

  renderCartItems();
}

/* Fecha la gaveta lateral do carrinho */
  export function closeCartDrawer() {
  var overlay = document.getElementById("cart-drawer-overlay");
  var gaveta = document.getElementById("cart-drawer");

  if (overlay) {
    overlay.classList.remove("open");
  }

  if (gaveta) {
    gaveta.classList.remove("open");
  }
}


/* --------------------------------------------------
   INICIALIZAÇÃO AUTOMÁTICA
   -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  injetarHTMLdaGaveta();
});