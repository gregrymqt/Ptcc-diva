import { Category }
from "../models/categoryModel.js";

import { createCategory }
from "../services/categoryService.js";

export function initCategoryForm(formId) {

  const form =
    document.getElementById(formId);

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const nome =
        document.getElementById("nome").value;

      const descricao =
        document.getElementById("descricao").value;

      const imagem =
        document.getElementById("imagem").value;

      const category =
        new Category(
          Date.now(),
          nome,
          descricao,
          imagem
        );

      createCategory(category);

      form.reset();

      alert(
        "Categoria cadastrada com sucesso!"
      );

    }
  );

}