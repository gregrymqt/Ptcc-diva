/* ================================================
   CART.JS — Página do Carrinho de Compras (Legado)

   Este arquivo é responsável por TUDO que acontece
   na página dedicada do carrinho (cart.html).

   Ele está dividido em 4 partes:
   1. Funções que lêem e modificam o carrinho
   2. Função que monta o HTML da tela
   3. Funções que reagem ao clique dos botões
   4. Inicialização da página (navbar, footer, itens)
   ================================================ */

import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }  from "../../shared/components/footer/footerComponent.js";
import { showToast }        from "../../shared/components/toast/toastComponent.js";


/* --------------------------------------------------
   PARTE 1: FUNÇÕES DO CARRINHO
   Lêem e salvam os dados do carrinho no localStorage.
   A chave usada é "cart".
   -------------------------------------------------- */

// Nome da chave onde o carrinho fica salvo no navegador
var CHAVE_CARRINHO = "cart";

/* Lê e retorna todos os itens do carrinho.
   Se não houver nada salvo, retorna uma lista vazia. */
function pegarItensDoCarrinho() {
  var dadosSalvos = localStorage.getItem(CHAVE_CARRINHO);

  if (!dadosSalvos) {
    return [];
  }

  return JSON.parse(dadosSalvos);
}

/* Salva a lista de itens do carrinho no localStorage. */
function salvarCarrinho(itens) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

/* Aumenta em 1 a quantidade de um item do carrinho.
   Recebe o id do item como texto (vem do atributo data-id do HTML). */
function aumentarQuantidade(id) {
  var itens = pegarItensDoCarrinho();

  // Percorre os itens um por um para achar o certo
  for (var i = 0; i < itens.length; i++) {
    if (itens[i].id === Number(id)) {
      itens[i].quantidade = itens[i].quantidade + 1;
    }
  }

  salvarCarrinho(itens);
}

/* Diminui em 1 a quantidade de um item.
   Se a quantidade chegar a 0, remove o item do carrinho. */
function diminuirQuantidade(id) {
  var itens = pegarItensDoCarrinho();
  var itensFiltrados = [];

  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];

    if (item.id === Number(id)) {
      // Se a quantidade for maior que 1, só diminui
      if (item.quantidade > 1) {
        item.quantidade = item.quantidade - 1;
        itensFiltrados.push(item);
      }
      // Se a quantidade for 1, não adiciona na lista (remove o item)

    } else {
      // Outros itens continuam normais
      itensFiltrados.push(item);
    }
  }

  salvarCarrinho(itensFiltrados);
}

/* Remove completamente um item do carrinho pelo id. */
function removerItem(id) {
  var itens = pegarItensDoCarrinho();
  var itensFiltrados = [];

  // Adiciona na lista apenas os itens que NÃO são o que queremos remover
  for (var i = 0; i < itens.length; i++) {
    if (itens[i].id !== Number(id)) {
      itensFiltrados.push(itens[i]);
    }
  }

  salvarCarrinho(itensFiltrados);
}

/* Calcula e retorna o valor total de todos os itens do carrinho. */
function calcularTotal(itens) {
  var total = 0;

  for (var i = 0; i < itens.length; i++) {
    total = total + (itens[i].preco * itens[i].quantidade);
  }

  return total;
}


/* --------------------------------------------------
   PARTE 2: MONTAR O HTML DA TELA

   Lê os itens do carrinho e monta o HTML
   que será exibido dentro de #cart-container.
   -------------------------------------------------- */

/* Monta e exibe todo o conteúdo da página do carrinho.
   É chamada na inicialização e toda vez que um item muda. */
function render() {
  // Coloca a navbar e o footer na tela
  document.querySelector("#navbar").innerHTML = navbarComponent();
  document.querySelector("#footer").innerHTML = footerComponent();

  // Pega os itens atuais do carrinho
  var itens = pegarItensDoCarrinho();

  // Se o carrinho estiver vazio, mostra mensagem
  if (itens.length === 0) {
    document.querySelector("#cart-container").innerHTML =
      '<section class="cart">' +
        '<h2>Carrinho</h2>' +
        '<p>Seu carrinho está vazio.</p>' +
      '</section>';

    return;
  }

  // Calcula o total para exibir no final
  var total = calcularTotal(itens);

  // Monta o HTML de cada item da lista
  var htmlItens = "";

  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];

    htmlItens = htmlItens +
      '<article class="cart-item">' +
        '<img src="' + item.imagem + '" alt="' + item.nome + '" class="cart-item-image">' +
        '<div class="cart-item-content">' +
          '<h3>' + item.nome + '</h3>' +
          '<p>R$ ' + (item.preco * item.quantidade).toFixed(2) + '</p>' +
          '<div class="cart-item-actions">' +
            '<button class="decrease-quantity" data-id="' + item.id + '">-</button>' +
            '<span>' + item.quantidade + '</span>' +
            '<button class="increase-quantity" data-id="' + item.id + '">+</button>' +
          '</div>' +
          '<button class="remove-cart-item" data-id="' + item.id + '">Remover</button>' +
        '</div>' +
      '</article>';
  }

  // Monta o HTML completo da seção do carrinho
  document.querySelector("#cart-container").innerHTML =
    '<section class="cart">' +
      '<h2>Meu Carrinho</h2>' +
      '<div class="cart-list">' +
        htmlItens +
      '</div>' +
      '<div class="cart-total">' +
        '<h3>Total: R$ ' + total.toFixed(2) + '</h3>' +
      '</div>' +
    '</section>';

  // Registra os eventos dos botões após o HTML ser inserido
  iniciarEventos();
}


/* --------------------------------------------------
   PARTE 3: EVENTOS DOS BOTÕES

   Registra as ações de clique para cada botão
   de aumentar, diminuir e remover.
   -------------------------------------------------- */

/* Percorre todos os botões de ação do carrinho
   e conecta cada um à sua função correspondente. */
function iniciarEventos() {
  // Botões de aumentar quantidade (+)
  var botoesAumentar = document.querySelectorAll(".increase-quantity");

  for (var i = 0; i < botoesAumentar.length; i++) {
    botoesAumentar[i].addEventListener("click", function() {
      var id = this.getAttribute("data-id");
      aumentarQuantidade(id);
      render(); // Atualiza a tela após a mudança
    });
  }

  // Botões de diminuir quantidade (-)
  var botoesDiminuir = document.querySelectorAll(".decrease-quantity");

  for (var j = 0; j < botoesDiminuir.length; j++) {
    botoesDiminuir[j].addEventListener("click", function() {
      var id = this.getAttribute("data-id");
      diminuirQuantidade(id);
      render();
    });
  }

  // Botões de remover item
  var botoesRemover = document.querySelectorAll(".remove-cart-item");

  for (var k = 0; k < botoesRemover.length; k++) {
    botoesRemover[k].addEventListener("click", function() {
      var id = this.getAttribute("data-id");
      removerItem(id);
      showToast("Produto removido do carrinho!");
      render();
    });
  }
}


/* --------------------------------------------------
   PARTE 4: INICIALIZAÇÃO

   Ponto de partida: monta a tela quando o
   arquivo é carregado pelo cart.html.
   -------------------------------------------------- */

render();