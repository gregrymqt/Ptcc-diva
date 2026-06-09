/* ================================================
   REGISTER.JS — Página de Cadastro da Diva

   Este arquivo é responsável por TUDO que acontece
   na tela de cadastro. Ele está dividido em 3 etapas:

   1. Montar o formulário na tela (HTML via JavaScript)
   2. Validar todos os campos quando o usuário enviar
   3. Verificar se o e-mail já existe e criar a conta
   ================================================ */

import { createUser, findUserByEmail } from "../../core/storage.js";
import { showToast } from "../../shared/components/toast/toastComponent.js";


/* --------------------------------------------------
   ETAPA 1: MONTAR O FORMULÁRIO NA TELA

   O arquivo register.html só tem uma <div id="app">
   vazia. Aqui inserimos o HTML do formulário
   dentro dela via JavaScript.
   -------------------------------------------------- */

// Pega a div principal da página para colocar o formulário dentro
var container = document.querySelector("#app");

// Escreve o HTML do formulário dentro da div #app
container.innerHTML =
  '<div class="login-card">' +
    '<div class="login-header">' +
      '<h1>Criar Conta</h1>' +
      '<p>Junte-se à Diva e tenha acesso a produtos exclusivos de beleza.</p>' +
    '</div>' +

    '<form novalidate>' +
      '<div class="input-container">' +
        '<input type="text" id="nome" required placeholder=" ">' +
        '<label for="nome">Nome Completo</label>' +
        '<span class="error-message" id="nome-error"></span>' +
      '</div>' +

      '<div class="input-container">' +
        '<input type="email" id="email" required placeholder=" ">' +
        '<label for="email">E-mail</label>' +
        '<span class="error-message" id="email-error"></span>' +
      '</div>' +

      '<div class="input-container">' +
        '<input type="password" id="senha" required placeholder=" ">' +
        '<label for="senha">Senha (Mínimo 6 caracteres)</label>' +
        '<span class="error-message" id="senha-error"></span>' +
      '</div>' +

      '<div class="input-container">' +
        '<input type="password" id="confirmar" required placeholder=" ">' +
        '<label for="confirmar">Confirmar Senha</label>' +
        '<span class="error-message" id="confirmar-error"></span>' +
      '</div>' +

      '<button class="btn-login" type="submit">' +
        '<span>Registar Conta</span>' +
      '</button>' +
    '</form>' +

    '<div class="login-footer">' +
      '<p>Já possui conta? <a href="../../login/pages/index.html">Entrar agora</a></p>' +
    '</div>' +
  '</div>';


/* --------------------------------------------------
   ETAPA 2: GUARDAR AS REFERÊNCIAS DOS CAMPOS

   Após colocar o HTML na tela, buscamos cada
   elemento do formulário e guardamos em variáveis.
   -------------------------------------------------- */

var formulario     = container.querySelector("form");
var campoNome      = document.getElementById("nome");
var campoEmail     = document.getElementById("email");
var campoSenha     = document.getElementById("senha");
var campoConfirmar = document.getElementById("confirmar");
var erroNome       = document.getElementById("nome-error");
var erroEmail      = document.getElementById("email-error");
var erroSenha      = document.getElementById("senha-error");
var erroConfirmar  = document.getElementById("confirmar-error");


/* --------------------------------------------------
   ETAPA 3: REAGIR AO ENVIO DO FORMULÁRIO

   Quando o usuário clicar em "Registar Conta",
   o evento "submit" dispara e este bloco executa.
   -------------------------------------------------- */

formulario.addEventListener("submit", function(evento) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  evento.preventDefault();

  // Apaga qualquer mensagem de erro da tentativa anterior
  limparErros();

  // Lê o que o usuário digitou nos campos
  var nome      = campoNome.value;
  var email     = campoEmail.value;
  var senha     = campoSenha.value;
  var confirmar = campoConfirmar.value;

  /* --- 3A: VALIDAR OS CAMPOS ---
     Verifica se todos os campos foram preenchidos
     corretamente antes de tentar criar a conta. */
  var camposSaoValidos = validarCampos(nome, email, senha, confirmar);

  // Se algum campo estiver errado, para aqui (o erro já foi exibido)
  if (!camposSaoValidos) {
    return;
  }

  /* --- 3B: VERIFICAR SE O E-MAIL JÁ EXISTE ---
     Antes de criar a conta, confere se já tem
     alguém cadastrado com esse e-mail. */
  var usuarioExistente = findUserByEmail(email);

  if (usuarioExistente) {
    mostrarErro("email", "Este e-mail já está cadastrado.");
    return;
  }

  /* --- 3C: CRIAR E SALVAR O NOVO USUÁRIO ---
     Monta o objeto com os dados do novo usuário.
     A role "user" é definida automaticamente —
     nenhum cadastro normal vira admin. */
  var novoUsuario = {
    nome:  nome,
    email: email,
    senha: senha,
    role:  "user"
  };

  // Salva o novo usuário no localStorage
  createUser(novoUsuario);

  // Exibe mensagem de sucesso e limpa o formulário
  showToast("Conta criada com sucesso! Bem-vinda à Diva.");
  formulario.reset();

  // Aguarda 1.5 segundos antes de redirecionar para o login
  setTimeout(function() {
    window.location.href = "../../login/pages/index.html";
  }, 1500);
});


/* --------------------------------------------------
   FUNÇÕES AUXILIARES

   Cada função abaixo tem uma responsabilidade
   clara e bem definida, facilitando a leitura.
   -------------------------------------------------- */

/* Verifica se todos os campos do formulário de cadastro
   estão preenchidos corretamente.
   Retorna true (tudo ok) ou false (tem algum erro). */
function validarCampos(nome, email, senha, confirmar) {
  var tudoValido = true;

  // Verifica se o nome foi preenchido
  if (nome.trim() === "") {
    mostrarErro("nome", "O nome é obrigatório");
    tudoValido = false;
  }

  // Verifica se o e-mail foi preenchido e tem formato válido
  if (email.trim() === "") {
    mostrarErro("email", "O e-mail é obrigatório");
    tudoValido = false;

  } else if (!emailEhValido(email)) {
    // O campo não está vazio, mas o formato está incorreto
    mostrarErro("email", "Digite um e-mail válido");
    tudoValido = false;
  }

  // Verifica se a senha foi preenchida e tem pelo menos 6 caracteres
  if (senha.trim() === "") {
    mostrarErro("senha", "A senha é obrigatória");
    tudoValido = false;

  } else if (senha.length < 6) {
    mostrarErro("senha", "A senha deve ter no mínimo 6 caracteres");
    tudoValido = false;
  }

  // Verifica se a confirmação foi preenchida e é igual à senha
  if (confirmar.trim() === "") {
    mostrarErro("confirmar", "Confirme a sua senha");
    tudoValido = false;

  } else if (confirmar !== senha) {
    // As senhas digitadas são diferentes
    mostrarErro("confirmar", "As senhas não coincidem");
    tudoValido = false;
  }

  return tudoValido;
}

/* Testa se o e-mail tem um formato válido (ex: nome@email.com).
   Usa uma expressão regular para checar o padrão. */
function emailEhValido(email) {
  var padrao = /\S+@\S+\.\S+/;
  return padrao.test(email);
}

/* Exibe uma mensagem de erro abaixo do campo com problema
   e adiciona uma borda vermelha para chamar a atenção. */
function mostrarErro(campo, mensagem) {
  if (campo === "nome") {
    erroNome.textContent = mensagem;
    campoNome.classList.add("input-error");
    campoNome.focus();

  } else if (campo === "email") {
    erroEmail.textContent = mensagem;
    campoEmail.classList.add("input-error");
    campoEmail.focus();

  } else if (campo === "senha") {
    erroSenha.textContent = mensagem;
    campoSenha.classList.add("input-error");
    campoSenha.focus();

  } else if (campo === "confirmar") {
    erroConfirmar.textContent = mensagem;
    campoConfirmar.classList.add("input-error");
    campoConfirmar.focus();
  }
}

/* Apaga todas as mensagens de erro e remove as bordas vermelhas,
   deixando o formulário limpo para uma nova tentativa. */
function limparErros() {
  erroNome.textContent      = "";
  erroEmail.textContent     = "";
  erroSenha.textContent     = "";
  erroConfirmar.textContent = "";

  campoNome.classList.remove("input-error");
  campoEmail.classList.remove("input-error");
  campoSenha.classList.remove("input-error");
  campoConfirmar.classList.remove("input-error");
}