/* ================================================
   PRODUCT-DETAIL.JS — Página de Detalhe do Produto (PDP)

   Este arquivo monta a página de detalhe de um produto
   específico. O produto é identificado pelo "id" na URL.
   Exemplo de URL: product-detail.html?id=1

   Ele está dividido em 4 partes:
   1. Montar a navbar e o footer
   2. Buscar o produto pelo ID da URL e montar o HTML
   3. Ativar a troca de imagem ao clicar nas cores
   4. Ativar o botão "Adicionar à Sacola"
   ================================================ */

import { navbarComponent }   from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }   from "../../shared/components/footer/footerComponent.js";
import { initNavbar }        from "../../shared/components/navbar/navbarController.js";
import { findProductById }   from "./services/productServices.js";
import { addToCart }         from "../cart/components/CartDrawerComponent.js";
import { openCartDrawer }    from "../cart/components/CartDrawerComponent.js";
import { productDetailComponent } from "./components/productDetailComponent.js";


/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();

initNavbar();


/* --------------------------------------------------
   PARTE 2: BUSCAR O PRODUTO E MONTAR A TELA

   Lê o "id" da URL e busca o produto no localStorage.
   Monta o HTML completo da página de detalhe.
   -------------------------------------------------- */

/* Lê o parâmetro "id" da URL atual.
   Exemplo: "product-detail.html?id=3" → retorna "3" */
function pegarIdDaUrl() {
  var parametros = new URLSearchParams(window.location.search);
  return parametros.get("id");
}

/* Formata um número para o padrão de moeda brasileira.
   Exemplo: 89.9 → "R$ 89,90" */
function formatarPreco(preco) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(preco);
}

/* Monta o HTML dos botões de cor (swatches) do produto. */
function montarSwatches(variacoes) {
  if (!variacoes || variacoes.length === 0) {
    return "";
  }

  var html = "";

  for (var i = 0; i < variacoes.length; i++) {
    var v       = variacoes[i];
    var ativo   = (i === 0) ? "active" : "";  // O primeiro swatch começa ativo

    html = html +
      '<button ' +
        'class="swatch ' + ativo + '" ' +
        'style="background-color: ' + v.hexadecimal + ';" ' +
        'data-image="' + v.imagem + '" ' +
        'data-colorname="' + v.cor + '" ' +
        'aria-label="Cor: ' + v.cor + '">' +
      '</button>';
  }

  return html;
}

/* Busca o produto pelo ID da URL e exibe o HTML completo da PDP. */
function montarPaginaDoProduto() {
  var conteudo = document.getElementById("content");

  if (!conteudo) {
    return;
  }

  var id = pegarIdDaUrl();

  // Se não houver ID na URL, mostra mensagem de erro
  if (!id) {
    conteudo.innerHTML =
      '<div class="pdp-error">' +
        '<h2>Produto não encontrado.</h2>' +
        '<a href="../../home/pages/home.html" class="btn-voltar">Voltar para a Vitrine</a>' +
      '</div>';
    return;
  }

  // Busca o produto no localStorage
  var produto = findProductById(id);

  // Se o produto não existir, mostra mensagem de erro
  if (!produto) {
    conteudo.innerHTML =
      '<div class="pdp-error">' +
        '<h2>Produto não encontrado.</h2>' +
        '<a href="../../home/pages/home.html" class="btn-voltar">Voltar para a Vitrine</a>' +
      '</div>';
    return;
  }

  var precoFormatado  = formatarPreco(produto.preco);
  var htmlSwatches    = montarSwatches(produto.variacoes);

  // Injeta o componente
  conteudo.innerHTML = productDetailComponent(produto, htmlSwatches, precoFormatado);

  // Após montar o HTML, ativa as interações da página
  ativarTrocaDeImagem();
  ativarBotaoAdicionarCarrinho(produto);
}


/* --------------------------------------------------
   PARTE 3: TROCA DE IMAGEM AO CLICAR NAS CORES

   Quando o usuário clica em um swatch de cor,
   troca a imagem principal para a cor selecionada.
   -------------------------------------------------- */

/* Ativa o evento de clique nos botões de cor (swatches). */
function ativarTrocaDeImagem() {
  var swatches      = document.querySelectorAll(".swatch");
  var imagemPrinc   = document.getElementById("pdp-main-image");
  var spanCorNome   = document.getElementById("pdp-selected-color");

  for (var i = 0; i < swatches.length; i++) {
    swatches[i].addEventListener("click", function() {
      // Remove a classe "active" de todos os swatches
      for (var j = 0; j < swatches.length; j++) {
        swatches[j].classList.remove("active");
      }

      // Marca o swatch clicado como ativo
      this.classList.add("active");

      // Troca a imagem com efeito de fade
      var novaImagem  = this.getAttribute("data-image");
      var nomeNovaCor = this.getAttribute("data-colorname");

      imagemPrinc.style.opacity = "0.5";

      setTimeout(function() {
        imagemPrinc.src            = novaImagem;
        spanCorNome.textContent    = nomeNovaCor;
        imagemPrinc.style.opacity  = "1";
      }, 150);
    });
  }
}


/* --------------------------------------------------
   PARTE 4: BOTÃO "ADICIONAR À SACOLA"

   Lê a cor selecionada, adiciona o produto ao
   carrinho e abre a gaveta lateral.
   -------------------------------------------------- */

/* Ativa o botão de adicionar ao carrinho. */
function ativarBotaoAdicionarCarrinho(produto) {
  var btnAdicionar = document.getElementById("btn-add-cart");

  if (!btnAdicionar) {
    return;
  }

  btnAdicionar.addEventListener("click", function() {
    var textOriginal = btnAdicionar.textContent;

    // Feedback visual imediato
    btnAdicionar.textContent       = "Adicionando...";
    btnAdicionar.disabled          = true;
    btnAdicionar.style.backgroundColor = "#2c2c2c";
    btnAdicionar.style.color           = "#fff";

    // Lê a cor ativa no momento do clique
    var swatchAtivo = document.querySelector(".swatch.active");
    var corAtiva    = swatchAtivo ? swatchAtivo.getAttribute("data-colorname") : "Única";

    // Adiciona o produto ao carrinho e abre a gaveta
    addToCart(produto, corAtiva);

    btnAdicionar.textContent = "Adicionado ✔";

    openCartDrawer();

    // Restaura o botão após 2 segundos
    setTimeout(function() {
      btnAdicionar.textContent       = textOriginal;
      btnAdicionar.style.backgroundColor = "";
      btnAdicionar.style.color           = "";
      btnAdicionar.disabled          = false;
    }, 2000);
  });
}


/* --------------------------------------------------
   INICIALIZAÇÃO

   Monta a página ao carregar o arquivo.
   -------------------------------------------------- */
montarPaginaDoProduto();
