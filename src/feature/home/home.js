/* ================================================
   HOME.JS — Página Inicial da Diva Cosméticos

   Este arquivo monta toda a página inicial da loja.
   Ele está dividido em componentes para seguir o
   princípio de responsabilidade única (SoC).
   ================================================ */

import { navbarComponent }   from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }   from "../../shared/components/footer/footerComponent.js";
import { initNavbar }        from "../../shared/components/navbar/navbarController.js";

import { categoryComponent } from "../categories/components/categoryComponent.js";
import { getCategories }     from "../categories/services/categoryService.js";
import { VitrineComponent }  from "../products/components/VitrineComponent.js";
import { getProductsWithCategory } from "../products/services/productServices.js";
import { heroComponent }     from "./components/heroComponent.js";

/* --------------------------------------------------
   CONTROLE DO CARROSSEL (HERO)
   -------------------------------------------------- */
var slideIndex = 0;
var carouselInterval = null;

function atualizarDots() {
  var dots = document.getElementsByClassName("dot");
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
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

// Boa Prática (Acessibilidade do DOM): Anexamos as funções no objeto global 'window' 
// para que o HTML de componentes gerados dinamicamente consiga enxergá-las através do 'onclick=""'.
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
   INICIALIZAÇÃO DA PÁGINA
   -------------------------------------------------- */

function inicializarHome() {
  // Coloca a navbar na tela
  document.getElementById("navbar").innerHTML = navbarComponent();

  try {
    // Boa Prática (SoC): O Controller busca os dados antes de enviá-los ao Componente Burro
    const categorias = getCategories();
    
    // O VitrineComponent agora é síncrono e Componente Burro (recebe dados)
    const produtosVitrine = getProductsWithCategory();
    const vitrineHtml = VitrineComponent(produtosVitrine);
    
    // Monta todo o conteúdo principal da home concatenando os componentes
    document.getElementById("content").innerHTML =
      heroComponent() +
      categoryComponent(categorias) +
      vitrineHtml;

    // Coloca o footer na tela
    document.getElementById("footer").innerHTML = footerComponent();

    // Ativa os comportamentos da navbar (menu mobile, contador do carrinho)
    initNavbar();

    // Iniciar o carousel
    iniciarCarousel();
  } catch (error) {
    console.error("Erro ao carregar a vitrine:", error);
  }
}

// Executa a inicialização assim que o arquivo é carregado
inicializarHome();