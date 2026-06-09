import {
  protectAdminPage
} from "../../core/rolesManager.js";

import {
  initProductForm
} from "./components/productFormComponent.js";

import {
  navbarComponent
} from "../../shared/components/navbar/navbarComponent.js";

import {
  footerComponent
} from "../../shared/components/footer/footerComponent.js";

import {
  initNavbar
} from "../../shared/components/navbar/navbarController.js";

// 1. GUARDA DE ROTA: Verifica a permissão antes de renderizar a página
protectAdminPage();

// 2. RENDERIZAÇÃO DA INTERFACE (Só executa se a função acima não redirecionar)
document.getElementById("navbar").innerHTML =
  navbarComponent();

document.getElementById("footer").innerHTML =
  footerComponent();

initNavbar();

// 3. INICIALIZAÇÃO DA FEATURE
initProductForm(
  "product-form"
);