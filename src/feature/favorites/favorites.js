import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";

import { favoriteComponent } from "./components/favoriteComponent.js";

import {
  getFavoriteProducts
}
from "./services/favoriteService.js";

import { initNavbar } from "../../shared/components/navbar/navbarController.js";
import { initFavoriteEvents } from "./favoriteEvents.js";

/**
 * Renderiza a página inteira.
 * Boa Prática: Todo o fluxo principal é encapsulado, 
 * evitando código perdido rodando na raiz do arquivo.
 */
function render() {
  document.getElementById("navbar").innerHTML = navbarComponent();
  document.getElementById("footer").innerHTML = footerComponent();

  var favoriteProducts = getFavoriteProducts();
  document.getElementById("favorites-content").innerHTML = favoriteComponent(favoriteProducts);

  initNavbar();
  
  // Bugfix: Agora inicializamos os ouvintes dos botões de "Remover"
  initFavoriteEvents();
}

render();