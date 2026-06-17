/* ================================================
   REGISTER.JS — Página de Cadastro da Diva

   Este arquivo é responsável por TUDO que acontece
   na tela de cadastro. Ele está dividido em 3 etapas:

   1. Montar o formulário na tela (HTML via JavaScript)
   2. Validar todos os campos quando o usuário enviar
   3. Verificar se o e-mail já existe e criar a conta
   ================================================ */

import { showToast } from "../../shared/components/toast/toastComponent.js";
import { RegistroForm } from "./components/RegisterForm.js";
import { RegistroModel } from "./models/RegisterModel.js";
import { RegisterService } from "./services/RegisterService.js";


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
  // Boa Prática (SoC): Delegamos totalmente as regras de negócio de validação
  // dos formulários para o nosso RegistroModel
  var validacao = RegistroModel.validate(nome, email, senha, confirmar);

  if (!validacao.isValid) {
    if (validacao.errors.nome) registroForm.showError("nome", validacao.errors.nome);
    if (validacao.errors.email) registroForm.showError("email", validacao.errors.email);
    if (validacao.errors.senha) registroForm.showError("senha", validacao.errors.senha);
    if (validacao.errors.confirmar) registroForm.showError("confirmar", validacao.errors.confirmar);
    return;
  }

  /* --- 3B: VERIFICAR SE O E-MAIL JÁ EXISTE E SALVAR ---
     Boa Prática (SoC): Em vez de testar no componente, passamos para o Service
     fazer as checagens no banco de dados e salvar tudo com segurança. */
  var resultado = RegisterService.register(nome, email, senha);

  if (!resultado.success) {
    if (resultado.errorType === "geral") {
        showToast(resultado.message, 3000, "error");
    } else {
        registroForm.showError(resultado.errorType, resultado.message);
    }
    return;
  }

  // Exibe mensagem de sucesso e limpa o formulário
  showToast("Conta criada com sucesso! Bem-vinda à Diva.");
  registroForm.reset();

  // Aguarda 1.5 segundos antes de redirecionar para o login
  setTimeout(function() {
    window.location.href = window.location.origin + "/src/feature/auth/pages/login.html";
  }, 1500);
});