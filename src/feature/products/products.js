/* ================================================
   PRODUCTS.JS — Página de Listagem de Produtos

   Este arquivo monta a página com todos os produtos
   da loja e gerencia as interações dos botões.

   Ele está dividido em 4 partes:
   1. Montar a navbar e o footer
   2. Buscar e exibir os produtos na tela
   3. Ativar o botão de favorito de cada produto
   4. Ativar o botão "Adicionar ao Carrinho"
   ================================================ */

import { getProductsWithCategory, updateProduct } from "./services/productServices.js";
import { initFavoriteEvents }      from "../favorites/favoriteEvents.js";
import { isFavorite }              from "../favorites/services/favoriteService.js";
import { addToCart }               from "../cart/components/CartDrawerComponent.js";
import { openCartDrawer }          from "../cart/components/CartDrawerComponent.js";
import { showToast }               from "../../shared/components/toast/toastComponent.js";
import { navbarComponent }         from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }         from "../../shared/components/footer/footerComponent.js";
import { initNavbar }              from "../../shared/components/navbar/navbarController.js";
import { getUserRole }             from "../../core/rolesManager.js";

var roleUsuarioLogado = "cliente";
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
  roleUsuarioLogado = getUserRole(email);
}
identificarRoleDoUsuario();


/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();


/* --------------------------------------------------
   PARTE 2: BUSCAR E EXIBIR OS PRODUTOS

   Lê os produtos do localStorage e monta os cards
   dentro do container da página.
   -------------------------------------------------- */

/* Monta o botão de favorito com o ícone certo
   (❤️ se já é favorito, 🤍 se não é). */
function montarBotaoFavorito(produtoId) {
  var ehFavorito = isFavorite(produtoId);
  var icone      = ehFavorito ? "❤️" : "🤍";

  return (
    '<button class="favorite-btn" data-product-id="' + produtoId + '">' +
      icone +
    '</button>'
  );
}

/* Monta e exibe todos os cards de produto na tela. */
function exibirProdutos() {
  var produtos  = getProductsWithCategory();
  var container = document.getElementById("products-container");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  for (var i = 0; i < produtos.length; i++) {
    var produto = produtos[i];

    var htmlBotoesAdmin = "";
    if (roleUsuarioLogado === "admin") {
      htmlBotoesAdmin = 
        '<div class="product-admin-actions">' +
          '<button class="btn-edit-product" data-id="' + produto.id + '">' +
            '<i class="fas fa-edit"></i> Alterar Produto' +
          '</button>' +
        '</div>';
    }

    container.innerHTML = container.innerHTML +
      '<div class="product-card">' +
        '<div class="product-image-wrapper">' +
          '<img src="' + produto.imagem + '" alt="' + produto.nome + '">' +
          montarBotaoFavorito(produto.id) +
        '</div>' +
        '<h3>' + produto.nome + '</h3>' +
        '<p>' + produto.descricao + '</p>' +
        '<small>Categoria: ' + produto.categoryName + '</small>' +
        '<span>R$ ' + Number(produto.preco).toFixed(2) + '</span>' +
        '<button class="add-to-cart-btn" data-id="' + produto.id + '">Adicionar ao Carrinho</button>' +
        htmlBotoesAdmin +
      '</div>';
  }

  // Ativa os botões de editar se for admin
  if (roleUsuarioLogado === "admin") {
    var btnEditElements = document.getElementsByClassName("btn-edit-product");
    for (var k = 0; k < btnEditElements.length; k++) {
      btnEditElements[k].addEventListener("click", function() {
        var productId = this.getAttribute("data-id");
        
        var produtosAtuais = getProductsWithCategory();
        var produtoAtual = null;
        for (var p = 0; p < produtosAtuais.length; p++) {
            if (produtosAtuais[p].id == productId) {
                produtoAtual = produtosAtuais[p];
                break;
            }
        }

        if (!produtoAtual) {
            showToast("Produto não encontrado", "error");
            return;
        }

        var camposFormulario = [
            { name: 'nome', label: 'Nome do Produto', type: 'text' },
            { name: 'descricao', label: 'Descrição', type: 'text' },
            { name: 'preco', label: 'Preço', type: 'number' },
            { name: 'imagem', label: 'URL da Imagem', type: 'text' }
        ];

        if (window.exibirModalUpdate) {
            window.exibirModalUpdate("Editar Produto", produtoAtual, camposFormulario, function(dadosAtualizados) {
                if (dadosAtualizados.preco) {
                    dadosAtualizados.preco = Number(dadosAtualizados.preco);
                }
                updateProduct(productId, dadosAtualizados);
                showToast("Produto atualizado com sucesso!", "success");
                exibirProdutos(); 
                ativarBotoesDeCarrinho(); 
            });
        } else {
            showToast("Componente de modal não encontrado", "error");
        }
      });
    }
  }
}

exibirProdutos();


/* --------------------------------------------------
   PARTE 3: ATIVAR BOTÕES DE FAVORITO

   Usa o sistema de delegação de eventos para
   escutar todos os cliques em botões de favorito.
   -------------------------------------------------- */
initFavoriteEvents();


/* --------------------------------------------------
   PARTE 4: BOTÃO "ADICIONAR AO CARRINHO"

   Quando o usuário clicar em "Adicionar ao Carrinho",
   busca o produto e abre a gaveta do carrinho.
   -------------------------------------------------- */

/* Registra o evento de clique para todos os botões
   de adicionar ao carrinho que estão na tela. */
function ativarBotoesDeCarrinho() {
  var botoes = document.querySelectorAll(".add-to-cart-btn");

  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function() {
      var produtoId = this.getAttribute("data-id");

      // Busca o produto correspondente ao botão clicado
      var produtos  = getProductsWithCategory();
      var produto   = null;

      for (var j = 0; j < produtos.length; j++) {
        if (produtos[j].id == produtoId) {
          produto = produtos[j];
        }
      }

      if (!produto) {
        showToast("Produto não encontrado!");
        return;
      }

      // Adiciona o produto ao carrinho com a variação padrão
      var corPadrao = "Única";

      if (produto.variacoes && produto.variacoes.length > 0) {
        corPadrao = produto.variacoes[0].cor;
      }

      addToCart(produto, corPadrao);
      showToast("Produto adicionado à sacola!");
      openCartDrawer();
    });
  }
}

ativarBotoesDeCarrinho();


/* --------------------------------------------------
   ATIVAR COMPORTAMENTOS DA NAVBAR
   -------------------------------------------------- */
initNavbar();