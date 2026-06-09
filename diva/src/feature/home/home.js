import { navbarComponent }
from "../../shared/components/navbar/navbarComponent.js";

import { footerComponent }
from "../../shared/components/footer/footerComponent.js";

import { homeContentComponent }
from "./components/homeContentComponent.js";

import {
  initNavbar
}
from "../../shared/components/navbar/navbarController.js";

document.getElementById("navbar").innerHTML =
  navbarComponent();

document.getElementById("content").innerHTML =
  homeContentComponent();

document.getElementById("footer").innerHTML =
  footerComponent();

initNavbar();