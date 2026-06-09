/* ================================================
   CREATE-CATEGORY.JS — Página de Criar Categoria (Admin)

   Esta página é exclusiva para administradores.
   Ela está dividida em 3 partes:

   1. Proteção de rota (bloqueia usuários comuns)
   2. Montagem da navbar e footer
   3. Configuração do formulário de criação
   ================================================ */

import { protectAdminPage }  from "../../core/rolesManager.js";
import { navbarComponent }   from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent }   from "../../shared/components/footer/footerComponent.js";
import { initNavbar }        from "../../shared/components/navbar/navbarController.js";
import { createCategory }    from "./services/categoryService.js";
import { showToast }         from "../../shared/components/toast/toastComponent.js";


/* --------------------------------------------------
   PARTE 1: PROTEÇÃO DE ROTA
   Redireciona usuários não-admin antes de qualquer coisa.
   -------------------------------------------------- */
protectAdminPage();


/* --------------------------------------------------
   PARTE 2: MONTAR A INTERFACE
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();

initNavbar();


/* --------------------------------------------------
   PARTE 3: FORMULÁRIO DE CRIAÇÃO DE CATEGORIA

   Quando o administrador preencher o formulário
   e clicar em "Salvar", criamos a categoria.
   -------------------------------------------------- */

/* Ativa o formulário de criação de categoria.
   Ouve o evento de envio e salva os dados no localStorage. */
function iniciarFormulario() {
  var formulario = document.getElementById("category-form");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    // Lê os valores preenchidos nos campos
    var nome     = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var imagem   = document.getElementById("imagem").value;

    // Cria o objeto da categoria com um ID baseado na hora atual
    var novaCategoria = {
      id:       Date.now(),
      nome:     nome,
      descricao: descricao,
      imagem:   imagem
    };

    // Salva a categoria no localStorage
    createCategory(novaCategoria);

    // Limpa o formulário e confirma ao usuário
    formulario.reset();
    showToast("Categoria cadastrada com sucesso!");
  });
}

iniciarFormulario();