/* ================================================
   LOGIN.JS — Página de Login da Diva Cosméticos

   Este arquivo é responsável por TUDO que acontece
   na tela de login. Ele está dividido em 3 etapas:

   1. Montar o formulário na tela (HTML via JavaScript)
   2. Validar os campos quando o usuário enviar
   3. Verificar as credenciais e fazer o login
   ================================================ */

import { findUserByEmail } from "../../core/storage.js";
import { showToast } from "../../shared/components/toast/toastComponent.js";


/* --------------------------------------------------
   ETAPA 1: MONTAR O FORMULÁRIO NA TELA

   O arquivo login.html só tem uma <div id="app">
   vazia. Aqui inserimos o HTML do formulário
   dentro dela via JavaScript.
   -------------------------------------------------- */

// Pega a div principal da página para colocar o formulário dentro
var container = document.querySelector("#app");

// Escreve o HTML do formulário dentro da div #app
container.innerHTML =
  '<div class="login-card">' +
  '<div class="login-header">' +
  '<h1>Seja bem-vinda</h1>' +
  '<p>Entre para conferir suas linhas de beleza favoritas e gerenciar seus pedidos.</p>' +
  '</div>' +

  '<form novalidate>' +
  '<div class="input-container">' +
  '<input type="email" id="email" required placeholder=" ">' +
  '<label for="email">E-mail</label>' +
  '<span class="error-message" id="email-error"></span>' +
  '</div>' +

  '<div class="input-container">' +
  '<input type="password" id="senha" required placeholder=" ">' +
  '<label for="senha">Senha</label>' +
  '<span class="error-message" id="senha-error"></span>' +
  '</div>' +

  '<button class="btn-login" type="submit">' +
  '<span>Entrar na Conta</span>' +
  '</button>' +
  '</form>' +

  '<div class="login-footer">' +
  '<p>Não possui conta? <a href="../registro/index.html">Criar minha conta</a></p>' +
  '</div>' +
  '</div>';


/* --------------------------------------------------
   ETAPA 2: GUARDAR AS REFERÊNCIAS DOS CAMPOS

   Após colocar o HTML na tela, buscamos cada
   elemento do formulário e guardamos em variáveis
   para usar nas próximas etapas.
   -------------------------------------------------- */

var formulario = container.querySelector("form");
var campoEmail = document.getElementById("email");
var campoSenha = document.getElementById("senha");
var erroEmail = document.getElementById("email-error");
var erroSenha = document.getElementById("senha-error");


/* --------------------------------------------------
   ETAPA 3: REAGIR AO ENVIO DO FORMULÁRIO

   Quando o usuário clicar em "Entrar na Conta",
   o evento "submit" dispara e este bloco executa.
   -------------------------------------------------- */

formulario.addEventListener("submit", function (evento) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  evento.preventDefault();

  // Apaga qualquer mensagem de erro da tentativa anterior
  limparErros();

  // Lê o que o usuário digitou nos campos
  var email = campoEmail.value;
  var senha = campoSenha.value;

  /* --- 3A: VALIDAR OS CAMPOS ---
     Antes de consultar o sistema, verifica se os
     campos estão preenchidos e no formato correto. */
  var camposSaoValidos = validarCampos(email, senha);

  // Se algum campo estiver errado, para aqui (o erro já foi exibido)
  if (!camposSaoValidos) {
    return;
  }

  /* --- 3B: VERIFICAR AS CREDENCIAIS ---
     Busca o usuário pelo e-mail e verifica
     se a senha digitada está correta. */
  var resultado = autenticar(email, senha);

  // Se a autenticação falhou, exibe o erro e para aqui
  if (!resultado.sucesso) {
    mostrarErro(resultado.campo, resultado.mensagem);
    return;
  }

  /* --- 3C: SALVAR SESSÃO E REDIRECIONAR ---
     Login bem-sucedido! Salva os dados do usuário
     no navegador e manda para a página inicial. */
  salvarSessao(resultado.usuario);
  showToast("Que bom ter você de volta, " + resultado.usuario.nome + "!");

  // Aguarda 1.5 segundos para o usuário ler o aviso antes de redirecionar
  setTimeout(function () {
    // Redireciona usando a origem da URL para evitar erros de caminho relativo (Erro 404)
    window.location.href = window.location.origin + "/diva/src/feature/home/pages/home.html";
  }, 1500);
});


/* --------------------------------------------------
   FUNÇÕES AUXILIARES

   Cada função abaixo tem uma responsabilidade
   clara e bem definida, facilitando a leitura.
   -------------------------------------------------- */

/* Verifica se o e-mail e a senha preenchidos são válidos.
   Retorna true (tudo ok) ou false (tem algum erro). */
function validarCampos(email, senha) {
  var tudoValido = true;

  // Verifica se o campo de e-mail está vazio
  if (email.trim() === "") {
    mostrarErro("email", "O e-mail é obrigatório");
    tudoValido = false;

  } else if (!emailEhValido(email)) {
    // O campo não está vazio, mas o formato está errado (ex: "teste" sem @)
    mostrarErro("email", "Digite um e-mail válido");
    tudoValido = false;
  }

  // Verifica se o campo de senha está vazio
  if (senha.trim() === "") {
    mostrarErro("senha", "A senha é obrigatória");
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

/* Busca o usuário no localStorage pelo e-mail informado
   e verifica se a senha digitada está correta.
   Retorna um objeto indicando sucesso ou falha. */
function autenticar(email, senha) {
  // --- ADIÇÃO: Verificação da credencial de Administrador (Hardcoded) ---
  // Verifica de maneira direta se o e-mail e a senha correspondem ao administrador padrão.
  // Esta verificação ocorre antes de buscar no localStorage, garantindo o acesso admin para testes.
  if (email === "admin@divamakeup.com" && senha === "admin123") {

    // Cria um objeto simulando o usuário administrador de acordo com a estrutura do sistema.
    // O mais importante aqui é definir a propriedade "role" como "admin".
    var usuarioAdmin = {
      nome: "Administrador",
      email: "admin@divamakeup.com",
      role: "admin"
    };

    // Retorna o sucesso e entrega os dados do administrador para o fluxo principal.
    // A função salvarSessao() (já existente no arquivo) se encarregará de salvar 
    // este objeto na chave 'usuarioLogado' do localStorage sem precisar de mais alterações.
    return { sucesso: true, usuario: usuarioAdmin };
  }
  // --- FIM DA ADIÇÃO ---

  // Procura na lista de usuários cadastrados alguém com esse e-mail
  var usuario = findUserByEmail(email);

  // Se não achou nenhum usuário com esse e-mail
  if (!usuario) {
    return { sucesso: false, campo: "email", mensagem: "Usuário não encontrado" };
  }

  // Se achou o usuário, mas a senha está errada
  if (usuario.senha !== senha) {
    return { sucesso: false, campo: "senha", mensagem: "Senha incorreta" };
  }

  // Tudo certo! Retorna sucesso com os dados do usuário
  return { sucesso: true, usuario: usuario };
}

/* Salva os dados do usuário logado no localStorage.
   É isso que mantém o usuário "conectado" enquanto navega pelo site. */
function salvarSessao(usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

/* Exibe uma mensagem de erro abaixo do campo com problema
   e adiciona uma borda vermelha para chamar a atenção. */
function mostrarErro(campo, mensagem) {
  if (campo === "email") {
    erroEmail.textContent = mensagem;
    campoEmail.classList.add("input-error");
    campoEmail.focus();
  } else if (campo === "senha") {
    erroSenha.textContent = mensagem;
    campoSenha.classList.add("input-error");
    campoSenha.focus();
  }
}

/* Apaga todas as mensagens de erro e remove as bordas vermelhas,
   deixando o formulário limpo para uma nova tentativa de login. */
function limparErros() {
  erroEmail.textContent = "";
  erroSenha.textContent = "";
  campoEmail.classList.remove("input-error");
  campoSenha.classList.remove("input-error");
}