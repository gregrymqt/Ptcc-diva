import { Product }
from "../models/products.js";

import { createProduct }
from "../services/productServices.js";

import {
  getCategories
}
from "../../categories/services/categoryService.js";

import {
  showToast
}
from "../../../shared/components/toast/toast.js";

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

  const imageInput = document.getElementById("product-image-input");
  const imagePreview = document.getElementById("product-image-preview");
  let base64Image = "";

  if (imageInput) {
    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) {
        imagePreview.style.display = "none";
        base64Image = "";
        return;
      }

      // Validação de 300KB (300 * 1024 = 307200 bytes)
      if (file.size > 300 * 1024) {
        showToast("A imagem deve ter no máximo 300KB para o MVP", "error");
        imageInput.value = "";
        imagePreview.style.display = "none";
        base64Image = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        base64Image = event.target.result;
        if (imagePreview) {
          imagePreview.src = base64Image;
          imagePreview.style.display = "block";
        }
      };
      reader.onerror = () => {
        showToast("Erro ao ler a imagem", "error");
        imageInput.value = "";
        if (imagePreview) imagePreview.style.display = "none";
        base64Image = "";
      };
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const nome =
        document.getElementById("nome").value;

      const preco =
        document.getElementById("preco").value;

      const descricao =
        document.getElementById("descricao").value;

      const imagem = base64Image || 'https://via.placeholder.com/600x600?text=Sem+Imagem';

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

      await createProduct(product);

      form.reset();
      
      if (imagePreview) {
        imagePreview.style.display = "none";
        imagePreview.src = "";
      }
      base64Image = "";

      showToast(
        "Produto cadastrado com sucesso!", "success"
      );

    }
  );

}