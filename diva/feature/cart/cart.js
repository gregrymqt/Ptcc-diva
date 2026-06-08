import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";

import { cartComponent } from "./components/cartComponent.js";

import {
  getCartProducts,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem
}
from "./services/cartService.js";

import {
  showToast
}
from "../../shared/components/toast/toastComponent.js";

function render() {

  document.querySelector("#navbar").innerHTML =
    navbarComponent();

 document.querySelector("#footer").innerHTML =
    footerComponent();

  const items =
    getCartProducts();

  document.querySelector("#cart-container").innerHTML =
    cartComponent(items);

  initEvents();

}

function initEvents() {

  document
    .querySelectorAll(".increase-quantity")
    .forEach(button => {

      button.addEventListener("click", () => {

        increaseQuantity(button.dataset.id);

        render();

      });

    });

  document
    .querySelectorAll(".decrease-quantity")
    .forEach(button => {

      button.addEventListener("click", () => {

        decreaseQuantity(button.dataset.id);

        render();

      });

    });

  document
    .querySelectorAll(".remove-cart-item")
    .forEach(button => {

      button.addEventListener("click", () => {

        removeCartItem(button.dataset.id);

        showToast(
          "Produto removido do carrinho!"
        );

        render();

      });

    });

}

render();