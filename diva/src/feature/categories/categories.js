/* ================================================
   CATEGORIES.JS — Página de Listagem de Categorias

   Este arquivo monta a página que lista todas as
   categorias cadastradas na loja.

   Ele está dividido em 3 partes:
   1. Montar a navbar e o footer
   2. Buscar as categorias do localStorage
   3. Exibir cada categoria na tela
   ================================================ */

import { getCategories }   from "./services/categoryService.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar }      from "../../shared/components/navbar/navbarController.js";


/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();


/* --------------------------------------------------
   PARTE 2 E 3: BUSCAR CATEGORIAS E EXIBIR NA TELA

   Lê as categorias salvas e insere os cards
   dentro da div#categories-container.
   -------------------------------------------------- */

/* Monta o HTML de cada categoria e coloca na tela. */
function exibirCategorias() {
  var categorias  = getCategories();
  var container   = document.getElementById("categories-container");

  if (!container) {
    return;
  }

  // Limpa o conteúdo anterior
  container.innerHTML = "";

  // Percorre cada categoria e monta seu card HTML
  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];

    container.innerHTML = container.innerHTML +
      '<article class="category-card">' +
        '<img src="' + cat.imagem + '" alt="' + cat.nome + '">' +
        '<div class="category-content">' +
          '<h3>' + cat.nome + '</h3>' +
          '<p>' + cat.descricao + '</p>' +
        '</div>' +
      '</article>';
  }
}

exibirCategorias();

// Ativa os comportamentos da navbar (menu mobile, contador)
initNavbar();