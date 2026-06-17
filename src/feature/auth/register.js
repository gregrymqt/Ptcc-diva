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
import { RegistroForm } from "./components/RegisterForm.js";


/* --------------------------------------------------
   ETAPA 1 e 2: MONTAR O FORMULÁRIO NA TELA E CAPTURAR REFERÊNCIAS
   
   Agora utilizamos o componente RegistroForm para cuidar da renderização.
   -------------------------------------------------- */
var registroForm = new RegistroForm("#app");
registroForm.render();



/* --------------------------------------------------
   ETAPA 3: REAGIR AO ENVIO DO FORMULÁRIO

   Quando o usuário clicar em "Registar Conta",
   o evento "submit" dispara e este bloco executa.
   -------------------------------------------------- */

registroForm.form.addEventListener("submit", function(evento) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  evento.preventDefault();

  // Apaga qualquer mensagem de erro da tentativa anterior
  registroForm.clearErrors();

  // Lê o que o usuário digitou nos campos
  var valores = registroForm.getValues();
  var nome      = valores.nome;
  var email     = valores.email;
  var senha     = valores.senha;
  var confirmar = valores.confirmar;

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
    registroForm.showError("email", "Este e-mail já está cadastrado.");
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
  registroForm.reset();

  // Aguarda 1.5 segundos antes de redirecionar para o login
  setTimeout(function() {
    window.location.href = window.location.origin + "/src/feature/home/pages/home.html";
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
    registroForm.showError("nome", "O nome é obrigatório");
    tudoValido = false;
  }

  // Verifica se o e-mail foi preenchido e tem formato válido
  if (email.trim() === "") {
    registroForm.showError("email", "O e-mail é obrigatório");
    tudoValido = false;

  } else if (!emailEhValido(email)) {
    // O campo não está vazio, mas o formato está incorreto
    registroForm.showError("email", "Digite um e-mail válido");
    tudoValido = false;
  }

  // Verifica se a senha foi preenchida e tem pelo menos 6 caracteres
  if (senha.trim() === "") {
    registroForm.showError("senha", "A senha é obrigatória");
    tudoValido = false;

  } else if (senha.length < 6) {
    registroForm.showError("senha", "A senha deve ter no mínimo 6 caracteres");
    tudoValido = false;
  }

  // Verifica se a confirmação foi preenchida e é igual à senha
  if (confirmar.trim() === "") {
    registroForm.showError("confirmar", "Confirme a sua senha");
    tudoValido = false;

  } else if (confirmar !== senha) {
    // As senhas digitadas são diferentes
    registroForm.showError("confirmar", "As senhas não coincidem");
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