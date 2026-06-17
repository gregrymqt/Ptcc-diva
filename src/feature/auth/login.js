/* ================================================
   LOGIN.JS — Página de Login da Diva Cosméticos

   Este arquivo é responsável por TUDO que acontece
   na tela de login. Ele está dividido em 3 etapas:

   1. Montar o formulário na tela (HTML via JavaScript)
   2. Validar os campos quando o usuário enviar
   3. Verificar as credenciais e fazer o login
   ================================================ */

import { showToast } from "../../shared/components/toast/toastComponent.js";
import { LoginForm } from "./components/LoginForm.js";
import { LoginModel } from "./models/LoginModel.js";
import { LoginService } from "./services/LoginService.js";


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
  // Boa Prática (SoC): A validação agora é responsabilidade estrita do LoginModel
  var validacao = LoginModel.validate(email, senha);

  if (!validacao.isValid) {
    if (validacao.errors.email) loginForm.showError("email", validacao.errors.email);
    if (validacao.errors.senha) loginForm.showError("senha", validacao.errors.senha);
    return;
  }

  /* --- 3B: VERIFICAR AS CREDENCIAIS ---
     Busca o usuário pelo e-mail e verifica
     se a senha digitada está correta. */
  // Boa Prática (SoC): O acesso aos dados fica isolado na camada de Serviço
  var resultado = LoginService.authenticate(email, senha);

  // Se a autenticação falhou, exibe o erro e para aqui
  if (!resultado.success) {
    loginForm.showError(resultado.errorType, resultado.message);
    return;
  }

  /* --- 3C: SALVAR SESSÃO E REDIRECIONAR ---
     Login bem-sucedido! Salva os dados do usuário
     no navegador e manda para a página inicial. */
  LoginService.createSession(resultado.user);
  showToast("Que bom ter você de volta, " + resultado.user.nome + "!");

  // Aguarda 1.5 segundos para o usuário ler o aviso antes de redirecionar
  setTimeout(function () {
    // Redireciona usando a origem da URL para evitar erros de caminho relativo (Erro 404)
    window.location.href = window.location.origin + "/src/feature/home/pages/home.html";
  }, 1500);
});