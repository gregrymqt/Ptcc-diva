import {
  getCategories
} from "../../categories/services/categoryService.js";

export function categoryComponent() {

  const categories = getCategories();

  if (categories.length === 0) {

    return `
      <section class="categories-section">

        <h2>Categorias</h2>

        <p>
          Nenhuma categoria cadastrada.
        </p>

      </section>
    `;

  }

  return `
    <section class="categories-section">

      <h2>Categorias</h2>

      <div class="categories-grid">

        ${categories.map(category => `

          <div class="category-card">

            <img
              src="${category.imagem}"
              alt="${category.nome}"
            >

            <h3>${category.nome}</h3>

            <p>${category.descricao}</p>

          </div>

        `).join("")}

      </div>

    </section>
  `;
}