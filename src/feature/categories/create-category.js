/* =========================================================
   CREATE-CATEGORY.JS — Página de Criar Categoria (Admin)
   
   Esta página é exclusiva para administradores.
   Totalmente adaptada sob as diretrizes da "Refatoração Reversa".
   ========================================================= */

import { protectAdminPage }    from "../../core/rolesManager.js";
import { navbarComponent }     from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }     from "../../shared/components/footer/footerComponent.js";
import { initNavbar }          from "../../shared/components/navbar/navbarController.js";
import { createCategory }      from "./services/categoryService.js";
import { showToast }           from "../../shared/components/toast/toastComponent.js";
import { categoryFormComponent } from "./components/categoryFormComponent.js";

/* --- PARTE 1: PROTEÇÃO DE ROTA --- */
protectAdminPage();

// Variável global para guardar a imagem convertida em Base64
var imagemBase64 = "";

/* --- FUNÇÃO DE UPLOAD DE IMAGEM --- */
function iniciarUploadDeImagem() {
  var campoImagem = document.getElementById("imagem");

  if (!campoImagem) return;

  campoImagem.addEventListener("change", function(evento) {
    var arquivo = evento.target.files[0];
    if (!arquivo) return;

    var leitor = new FileReader();
    leitor.onload = function(e) {
      imagemBase64 = e.target.result;
    };
    leitor.readAsDataURL(arquivo);
  });
}

/* --- PARTE 2: CONFIGURAÇÃO DO FORMULÁRIO --- */
function iniciarFormulario() {
  var formulario = document.getElementById("category-form");

  if (!formulario) {
    return;
  }

  // Escuta o evento tradicional de submit sem arrow functions
  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    // Captura explícita dos elementos do DOM
    var campoNome = document.getElementById("nome");
    var campoDescricao = document.getElementById("descricao");
    var campoImagem = document.getElementById("imagem");

    // Validação extra simples
    if (campoNome.value.trim() === "" || campoDescricao.value.trim() === "") {
      showToast("Por favor, preencha todos os campos corretamente.", "error");
      return;
    }

    // Se não tiver imagem, usa um placeholder genérico
    var imagemFinal = imagemBase64;

    if (!imagemFinal || imagemFinal === "") {
      imagemFinal = "https://via.placeholder.com/600x600?text=Sem+Imagem";
    }

    // Estruturação do objeto clássico sem spread operator ou OOP complexa
    var novaCategoria = {
      id: Date.now(),
      nome: campoNome.value,
      descricao: campoDescricao.value,
      imagem: imagemFinal
    };

    // Executa a persistência no localStorage por meio do service
    createCategory(novaCategoria);

    // Reseta todos os campos de forma limpa
    formulario.reset();
    imagemBase64 = "";
    
    // Alerta visual de sucesso para o administrador
    showToast("Categoria cadastrada com sucesso!", "success");
  });
}

/* --- PARTE 3: INICIALIZAÇÃO DA PÁGINA --- */
document.addEventListener("DOMContentLoaded", function() {
  // Injeção de Navbar e Footer estruturais
  document.getElementById("navbar").innerHTML = navbarComponent();
  document.getElementById("footer").innerHTML = footerComponent();
  initNavbar();

  // Injeção dinâmica do componente de formulário
  var containerForm = document.getElementById("category-form-container");
  if (containerForm) {
    containerForm.innerHTML = categoryFormComponent();
  }

  // Vincula as regras lógicas e escutas de eventos ao formulário recém-injetado
  iniciarUploadDeImagem();
  iniciarFormulario();
});