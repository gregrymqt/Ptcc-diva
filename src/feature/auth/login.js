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
import { LoginForm } from "./components/LoginForm.js";


/* --------------------------------------------------
   ETAPA 1 e 2: MONTAR O FORMULÁRIO NA TELA E CAPTURAR REFERÊNCIAS
   
   Agora utilizamos o componente LoginForm para cuidar da renderização.
   -------------------------------------------------- */
var loginForm = new LoginForm("#app");
loginForm.render();


/* --------------------------------------------------
   ETAPA 3: REAGIR AO ENVIO DO FORMULÁRIO

   Quando o usuário clicar em "Entrar na Conta",
   o evento "submit" dispara e este bloco executa.
   -------------------------------------------------- */

loginForm.form.addEventListener("submit", function (evento) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  evento.preventDefault();

  // Apaga qualquer mensagem de erro da tentativa anterior
  loginForm.clearErrors();

  // Lê o que o usuário digitou nos campos
  var valores = loginForm.getValues();
  var email = valores.email;
  var senha = valores.senha;

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
    loginForm.showError(resultado.campo, resultado.mensagem);
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
    window.location.href = window.location.origin + "/src/feature/home/pages/home.html";
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
    loginForm.showError("email", "O e-mail é obrigatório");
    tudoValido = false;

  } else if (!emailEhValido(email)) {
    // O campo não está vazio, mas o formato está errado (ex: "teste" sem @)
    loginForm.showError("email", "Digite um e-mail válido");
    tudoValido = false;
  }

  // Verifica se o campo de senha está vazio
  if (senha.trim() === "") {
    loginForm.showError("senha", "A senha é obrigatória");
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