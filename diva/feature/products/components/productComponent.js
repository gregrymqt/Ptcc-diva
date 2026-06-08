import {
  favoriteButtonComponent
}
from "../../favorites/components/favoriteButtonComponent.js";

export function renderProducts(
  products,
  containerId
) {

  const container =
    document.getElementById(containerId);

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `

      <div class="product-card">

        <div class="product-image-wrapper">

          <img
            src="${product.imagem}"
            alt="${product.nome}"
          >

          ${favoriteButtonComponent(
            product.id
          )}

        </div>

        <h3>${product.nome}</h3>

        <p>${product.descricao}</p>

        <small>
          Categoria:
          ${product.categoryName}
        </small>

        <span>
          R$ ${product.preco}
        </span>

      </div>

    `;

  });

}