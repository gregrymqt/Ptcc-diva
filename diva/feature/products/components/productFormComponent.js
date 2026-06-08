import { Product }
from "../models/productModel.js";

import { createProduct }
from "../services/productService.js";

import {
  getCategories
}
from "../../categories/services/categoryService.js";

export function initProductForm(formId) {

  const form =
    document.getElementById(formId);

  const categorySelect =
    document.getElementById("categoryId");

  const categories =
    getCategories();

  categorySelect.innerHTML =
    '<option value="">Selecione uma categoria</option>';

  categories.forEach(category => {

    categorySelect.innerHTML += `
      <option value="${category.id}">
        ${category.nome}
      </option>
    `;

  });

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const nome =
        document.getElementById("nome").value;

      const preco =
        document.getElementById("preco").value;

      const descricao =
        document.getElementById("descricao").value;

      const imagem =
        document.getElementById("imagem").value;

      const categoryId =
        Number(
          document.getElementById("categoryId").value
        );

      const product =
        new Product(
          Date.now(),
          nome,
          Number(preco),
          descricao,
          imagem,
          categoryId
        );

      createProduct(product);

      form.reset();

      alert(
        "Produto cadastrado com sucesso!"
      );

    }
  );

}