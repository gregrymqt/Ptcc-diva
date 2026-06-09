/* ================================================
   HOME.JS — Página Inicial da Diva Cosméticos

   Este arquivo monta toda a página inicial da loja.
   Ele está dividido em 4 partes:

   1. Montar o banner principal (Hero)
   2. Montar a seção de categorias
   3. Montar a vitrine de produtos em destaque
   4. Inicializar a página ao carregar
   ================================================ */

import { navbarComponent }       from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }       from "../../shared/components/footer/footerComponent.js";
import { initNavbar }            from "../../shared/components/navbar/navbarController.js";
import { getCategories }         from "../categories/services/categoryService.js";
import { getProductsWithCategory } from "../products/services/productServices.js";


/* --------------------------------------------------
   PARTE 1: BANNER PRINCIPAL (HERO)

   Monta o HTML do banner de boas-vindas com
   o slogan da loja e os botões de ação.
   -------------------------------------------------- */

/* Retorna o HTML do banner principal da home. */
function montarHero() {
  return (
    '<section class="hero">' +
      '<div class="hero-content">' +
        '<h1>Desperte a <span>diva</span> que vive em você</h1>' +
        '<p>Produtos premium de maquiagem para realçar sua beleza.</p>' +
        '<div class="hero-buttons">' +
          '<a href="../../products/pages/products.html" class="btn-primary">Comprar Agora</a>' +
          '<a href="#" class="btn-secondary">Conheça a Marca</a>' +
        '</div>' +
      '</div>' +
      '<div class="hero-image">' +
        '<div class="carousel">' +
          '<img src="../../../assets/images/banner-1.png" alt="Produtos Diva Makeup">' +
        '</div>' +
      '</div>' +
    '</section>'
  );
}


/* --------------------------------------------------
   PARTE 2: SEÇÃO DE CATEGORIAS

   Lê as categorias do localStorage e monta
   os cards de categoria na página.
   -------------------------------------------------- */

/* Retorna o HTML da seção de categorias da home. */
function montarCategorias() {
  var categorias = getCategories();

  // Se não houver categorias cadastradas, mostra mensagem
  if (categorias.length === 0) {
    return (
      '<section class="categories-section">' +
        '<h2>Categorias</h2>' +
        '<p>Nenhuma categoria cadastrada.</p>' +
      '</section>'
    );
  }

  // Monta o HTML de cada card de categoria
  var htmlCategorias = "";

  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];

    htmlCategorias = htmlCategorias +
      '<div class="category-card">' +
        '<img src="' + cat.imagem + '" alt="' + cat.nome + '">' +
        '<h3>' + cat.nome + '</h3>' +
        '<p>' + cat.descricao + '</p>' +
      '</div>';
  }

  return (
    '<section class="categories-section">' +
      '<h2>Categorias</h2>' +
      '<div class="categories-grid">' +
        htmlCategorias +
      '</div>' +
    '</section>'
  );
}


/* --------------------------------------------------
   PARTE 3: VITRINE DE PRODUTOS EM DESTAQUE

   Lê os produtos do localStorage e monta os cards
   da vitrine principal da loja.
   -------------------------------------------------- */

/* Formata um número de preço para o padrão brasileiro.
   Exemplo: 49.9 → "R$ 49,90" */
function formatarPreco(preco) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(preco);
}

/* Retorna o HTML da vitrine com os produtos em destaque. */
function montarVitrine() {
  var produtos = getProductsWithCategory();

  // Se não houver produtos, mostra mensagem
  if (!produtos || produtos.length === 0) {
    return '<div class="vitrine-empty"><p>Nenhum produto encontrado no momento.</p></div>';
  }

  // Monta o HTML de cada card de produto
  var htmlProdutos = "";

  for (var i = 0; i < produtos.length; i++) {
    var produto = produtos[i];

    // Tenta pegar a imagem da primeira variação de cor
    var imagemPrincipal = "https://via.placeholder.com/400x400?text=Sem+Imagem";

    if (produto.variacoes && produto.variacoes.length > 0) {
      imagemPrincipal = produto.variacoes[0].imagem;
    }

    htmlProdutos = htmlProdutos +
      '<div class="vitrine-card">' +
        '<div class="vitrine-image-container">' +
          '<img src="' + imagemPrincipal + '" alt="' + produto.nome + '" class="vitrine-image" loading="lazy">' +
        '</div>' +
        '<div class="vitrine-info">' +
          '<span class="vitrine-category">' + produto.categoryName + '</span>' +
          '<h3 class="vitrine-title">' + produto.nome + '</h3>' +
          '<p class="vitrine-price">' + formatarPreco(produto.preco) + '</p>' +
          '<a href="../products/pages/product-detail.html?id=' + produto.id + '" class="btn-detalhes">Ver Detalhes</a>' +
        '</div>' +
      '</div>';
  }

  return (
    '<section class="vitrine-section">' +
      '<h2 class="section-title">Destaques Diva</h2>' +
      '<div class="vitrine-grid">' +
        htmlProdutos +
      '</div>' +
    '</section>'
  );
}


/* --------------------------------------------------
   PARTE 4: INICIALIZAÇÃO

   Ponto de partida: monta toda a página quando
   o arquivo é carregado pelo home.html.
   -------------------------------------------------- */

/* Monta e exibe toda a página inicial da loja. */
function inicializarHome() {
  // Coloca a navbar na tela
  document.getElementById("navbar").innerHTML = navbarComponent();

  // Monta todo o conteúdo principal da home
  document.getElementById("content").innerHTML =
    montarHero() +
    montarCategorias() +
    montarVitrine();

  // Coloca o footer na tela
  document.getElementById("footer").innerHTML = footerComponent();

  // Ativa os comportamentos da navbar (menu mobile, contador do carrinho)
  initNavbar();
}

// Executa a inicialização assim que o arquivo é carregado
inicializarHome();