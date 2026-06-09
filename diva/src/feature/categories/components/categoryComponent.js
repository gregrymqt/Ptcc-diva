export function renderCategories(
  categories,
  containerId
) {

  const container =
    document.getElementById(containerId);

  container.innerHTML = "";

  categories.forEach(category => {

    container.innerHTML += `

      <article class="category-card">

        <img
          src="${category.imagem}"
          alt="${category.nome}"
        >

        <div class="category-content">

          <h3>${category.nome}</h3>

          <p>${category.descricao}</p>

        </div>

      </article>

    `;

  });

}