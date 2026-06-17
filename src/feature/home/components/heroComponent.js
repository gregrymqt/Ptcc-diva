import { getHeroConfig } from "../services/heroService.js";

/**
 * Componente Burro (Dumb Component) do Carrossel Principal.
 * Boa Prática (Arquitetura de Componentes): Ele apenas solicita os dados 
 * e os transforma em marcação HTML, sem misturar temporizadores da tela aqui.
 */
export function heroComponent() {
  var heroSlides = getHeroConfig();
  
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
        '<div class="hero-slide-inner">' +
          '<div class="hero-content">' +
            '<h1>' + slide.titulo + '</h1>' +
            '<p>' + slide.subtitulo + '</p>' +
            '<div class="hero-buttons">' +
              '<a href="../../products/pages/products.html" class="btn-primary">Comprar Agora</a>' +
              '<a href="../../about/pages/about.html" class="btn-secondary">Conheça a Marca</a>' +
            '</div>' +
          '</div>' +
          '<div class="hero-image">' +
            '<div class="carousel">' +
              '<img src="' + slide.imagem + '" alt="Banner Diva Makeup">' +
            '</div>' +
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