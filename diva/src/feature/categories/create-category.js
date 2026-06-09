import {
  protectAdminPage
} from "../../core/rolesManager.js";

import {
  initCategoryForm
} from "./components/categoryFormComponent.js";

import {
  navbarComponent
} from "../../shared/components/navbar/navbarComponent.js";

import {
  footerComponent
} from "../../shared/components/footer/footerComponent.js";

import {
  initNavbar
} from "../../shared/components/navbar/navbarController.js";

// 1. GUARDA DE ROTA: Bloqueia acesso de usuários comuns e não logados
protectAdminPage();

// 2. RENDERIZAÇÃO DA INTERFACE
document.getElementById("navbar").innerHTML =
  navbarComponent();

document.getElementById("footer").innerHTML =
  footerComponent();

initNavbar();

// 3. INICIALIZAÇÃO DA FEATURE
initCategoryForm(
  "category-form"
);