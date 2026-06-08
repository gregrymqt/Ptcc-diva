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

        <img
          src="${product.imagem}"
          alt="${product.nome}"
        >

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