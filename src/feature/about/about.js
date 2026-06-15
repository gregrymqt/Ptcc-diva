/* ================================================
   ABOUT.JS — Lógica da Página Sobre Nós / Contato
   ================================================ */

import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar }      from "../../shared/components/navbar/navbarController.js";
import { aboutComponent }  from "./components/aboutComponent.js";

/* Inicializa a página injetando os componentes globais */
function inicializarAbout() {
  var navbarEl = document.getElementById("navbar");
  var contentEl = document.getElementById("content");
  var footerEl = document.getElementById("footer");

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

/* Configura o evento de submit do formulário de contato */
function configurarFormularioContato() {
  var formContato = document.getElementById("form-contato");

  if (formContato) {
    formContato.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita o recarregamento da página

      // Exibe uma mensagem de sucesso para o usuário
      alert("Mensagem enviada com sucesso! Retornaremos em breve.");

      // Limpa os campos do formulário
      formContato.reset();
    });
  }
}

// Executa a inicialização ao carregar o arquivo
inicializarAbout();
