import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";

import { favoriteComponent } from "./components/favoriteComponent.js";

import {
    getFavoriteProducts
} from "./services/favoriteService.js";

document.getElementById("navbar").innerHTML =
    navbarComponent();

document.getElementById("footer").innerHTML =
    footerComponent();

const favoriteProducts =
    getFavoriteProducts();

document.getElementById("favorites-content").innerHTML =
    favoriteComponent(favoriteProducts);
    