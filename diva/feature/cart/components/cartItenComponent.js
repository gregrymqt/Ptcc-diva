export function cartItemComponent(item) {

  return `
    <article class="cart-item">

      <img
        src="${item.imagem}"
        alt="${item.nome}"
        class="cart-item-image"
      >

      <div class="cart-item-content">

        <h3>${item.nome}</h3>

        <p>
          R$ ${(item.preco * item.quantidade).toFixed(2)}
        </p>

        <div class="cart-item-actions">

          <button
            class="decrease-quantity"
            data-id="${item.id}"
          >
            -
          </button>

          <span>${item.quantidade}</span>

          <button
            class="increase-quantity"
            data-id="${item.id}"
          >
            +
          </button>

        </div>

        <button
          class="remove-cart-item"
          data-id="${item.id}"
        >
          Remover
        </button>

      </div>

    </article>
  `;
}