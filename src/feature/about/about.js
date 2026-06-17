/* ================================================
   ABOUT.JS — Lógica da Página Sobre Nós / Contato
   ================================================ */

import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar }      from "../../shared/components/navbar/navbarController.js";
import { aboutComponent }  from "./components/aboutComponent.js";

/**
 * Função principal que atua como o Controller da página.
 * Ela orquestra a injeção dos componentes na tela.
 */
function inicializarAbout() {
  var navbarEl = document.getElementById("navbar");
  var contentEl = document.getElementById("content");
  var footerEl = document.getElementById("footer");

  // Boa Prática (Arquitetura de Componentes): Injeta HTML gerado dinamicamente
  // promovendo extrema reutilização de código entre páginas
  if (navbarEl) {
    navbarEl.innerHTML = navbarComponent();
  }

  if (contentEl) {
    contentEl.innerHTML = aboutComponent();
  }

  if (footerEl) {
    footerEl.innerHTML = footerComponent();
  }

  initNavbar();
  configurarFormularioContato();
}

/**
 * Captura o formulário de contato e intercepta seu evento de envio.
 */
function configurarFormularioContato() {
  var formContato = document.getElementById("form-contato");

  if (formContato) {
    formContato.addEventListener("submit", function(event) {
      // Boa Prática (Manipulação Limpa do DOM): Previne o recarregamento natural 
      // da página, mantendo a característica de Single Page Application (SPA).
      event.preventDefault();

      // Exibe uma mensagem de sucesso para o usuário
      alert("Mensagem enviada com sucesso! Retornaremos em breve.");

      // Limpa os campos do formulário
      formContato.reset();
    });
  }
}

// Executa a inicialização ao carregar o arquivo
inicializarAbout();
