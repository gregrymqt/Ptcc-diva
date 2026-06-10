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


import { getStorageData }        from "../../core/storage.js";

/* --------------------------------------------------
   PARTE 1: BANNER PRINCIPAL (HERO)
   -------------------------------------------------- */

function montarHero() {
  var heroSlides = getStorageData('heroConfig');
  
  if (!heroSlides || !Array.isArray(heroSlides) || heroSlides.length === 0) {
    heroSlides = [{
      id: 1,
      titulo: "Desperte a <span>diva</span> que vive em você",
      subtitulo: "Produtos premium de maquiagem para realçar sua beleza.",
      imagem: "../../../assets/images/banner-1.png"
    }];
  }

  var htmlSlides = "";
  var htmlDots = "";
  var numSlides = heroSlides.length > 3 ? 3 : heroSlides.length;

  for (var i = 0; i < numSlides; i++) {
    var slide = heroSlides[i];
    var isActive = i === 0 ? " active" : "";
    
    htmlSlides += 
      '<section class="hero-slide-item' + isActive + '">' +
        '<div class="hero-content">' +
          '<h1>' + slide.titulo + '</h1>' +
          '<p>' + slide.subtitulo + '</p>' +
          '<div class="hero-buttons">' +
            '<a href="../../products/pages/products.html" class="btn-primary">Comprar Agora</a>' +
            '<a href="#" class="btn-secondary">Conheça a Marca</a>' +
          '</div>' +
        '</div>' +
        '<div class="hero-image">' +
          '<div class="carousel">' +
            '<img src="' + slide.imagem + '" alt="Banner Diva Makeup">' +
          '</div>' +
        '</div>' +
      '</section>';
      
    // Cria um dot para cada slide
    htmlDots += '<span class="dot' + isActive + '" onclick="window.irParaSlide(' + i + ')"></span>';
  }

  var botoesNavegacao = "";
  var dotsNavegacao = "";
  
  if (numSlides > 1) {
    botoesNavegacao = 
      '<button class="carousel-btn prev-btn" onclick="window.mudarSlide(-1)">&#10094;</button>' +
      '<button class="carousel-btn next-btn" onclick="window.mudarSlide(1)">&#10095;</button>';
      
    dotsNavegacao = '<div class="carousel-dots">' + htmlDots + '</div>';
  }

  return '<div class="hero-carousel-container">' + htmlSlides + botoesNavegacao + dotsNavegacao + '</div>';
}

var slideIndex = 0;
var carouselInterval = null;

function atualizarDots() {
  var dots = document.getElementsByClassName("dot");
  for (var i = 0; i < dots.length; i++) {
    // Remove a classe active de todos
    dots[i].className = dots[i].className.replace(" active", "");
  }
  // Adiciona a classe active no dot correspondente ao slideAtual
  if (dots[slideIndex]) {
    dots[slideIndex].className += " active";
  }
}

function mostrarProximoSlide() {
  var slides = document.getElementsByClassName("hero-slide-item");
  if (slides.length <= 1) return;

  if (slides[slideIndex]) {
    slides[slideIndex].className = "hero-slide-item";
  }

  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  if (slides[slideIndex]) {
    slides[slideIndex].className = "hero-slide-item active";
  }
  
  atualizarDots();
}

window.mudarSlide = function(n) {
  var slides = document.getElementsByClassName("hero-slide-item");
  if (slides.length <= 1) return;

  if (slides[slideIndex]) {
    slides[slideIndex].className = "hero-slide-item";
  }

  slideIndex = slideIndex + n;
  
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  if (slides[slideIndex]) {
    slides[slideIndex].className = "hero-slide-item active";
  }

  atualizarDots();

  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(mostrarProximoSlide, 5000);
  }
};

window.irParaSlide = function(index) {
  var slides = document.getElementsByClassName("hero-slide-item");
  if (slides.length <= 1) return;

  if (slides[slideIndex]) {
    slides[slideIndex].className = "hero-slide-item";
  }

  slideIndex = index;

  if (slides[slideIndex]) {
    slides[slideIndex].className = "hero-slide-item active";
  }

  atualizarDots();

  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(mostrarProximoSlide, 5000);
  }
};

function iniciarCarousel() {
  var slides = document.getElementsByClassName("hero-slide-item");
  if (slides.length > 1) {
    carouselInterval = setInterval(mostrarProximoSlide, 5000);
  }
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

    // Tenta pegar a imagem da primeira variação de cor ou a imagem base do produto
    var imagemPrincipal = produto.imagem || "https://via.placeholder.com/400x400?text=Sem+Imagem";

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
          '<a href="../../products/pages/product-detail.html?id=' + produto.id + '" class="btn-detalhes">Ver Detalhes</a>' +
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

  // Iniciar o carousel
  iniciarCarousel();
}

// Executa a inicialização assim que o arquivo é carregado
inicializarHome();