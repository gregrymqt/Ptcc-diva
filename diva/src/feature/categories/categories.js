import { getCategories }
from "./services/categoryService.js";

import { renderCategories }
from "./components/categoryComponent.js";

import {
  navbarComponent
}
from "../../shared/components/navbar/navbarComponent.js";

import {
  footerComponent
}
from "../../shared/components/footer/footerComponent.js";

import {
  initNavbar
}
from "../../shared/components/navbar/navbarController.js";

document.getElementById("navbar").innerHTML =
  navbarComponent();

document.getElementById("footer").innerHTML =
  footerComponent();

const categories =
  getCategories();

renderCategories(
  categories,
  "categories-container"
);

initNavbar();