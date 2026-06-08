import { cartItemComponent } from "./cartItemComponent.js";

export function cartComponent(items) {

  if (!items.length) {

    return `
      <section class="cart">

        <h2>Carrinho</h2>

        <p>Seu carrinho está vazio.</p>

      </section>
    `;

  }

  const total = items.reduce((acc, item) => {

    return acc + (item.preco * item.quantidade);

  }, 0);

  return `
    <section class="cart">

      <h2>Meu Carrinho</h2>

      <div class="cart-list">

        ${items
          .map(cartItemComponent)
          .join("")}

      </div>

      <div class="cart-total">

        <h3>
          Total: R$ ${total.toFixed(2)}
        </h3>

      </div>

    </section>
  `;
}