import { Product } from "../models/productModel.js";
import { createProduct } from "../services/productService.js";

export function initProductForm(formId) {

  const form = document.getElementById(formId);

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;
    const imagem = document.getElementById("imagem").value;

    const product = new Product(
      Date.now(),
      nome,
      Number(preco),
      descricao,
      imagem
    );

    createProduct(product);

    form.reset();

    alert("Produto cadastrado com sucesso!");

  });

}