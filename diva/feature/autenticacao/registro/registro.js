import {
  createUser,
  findUserByEmail
} from "../../../core/storage.js";


import {
  showToast
}
from "../../../shared/components/toast/toastComponent.js";


/* FORM */
const form = document.querySelector("form");

/* INPUTS */
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const confirmar = document.querySelector("#confirmar");

/* SPANS DE ERRO */
const nomeError = document.querySelector("#nome-error");
const emailError = document.querySelector("#email-error");
const senhaError = document.querySelector("#senha-error");
const confirmarError = document.querySelector("#confirmar-error");

/*LIMPAR ERROS*/
function clearErrors(){

  nomeError.textContent = "";
  emailError.textContent = "";
  senhaError.textContent = "";
  confirmarError.textContent = "";

  nome.classList.remove("input-error");
  email.classList.remove("input-error");
  senha.classList.remove("input-error");
  confirmar.classList.remove("input-error");

}

/*VALIDAR EMAIL*/
function isValidEmail(email){

  return /\S+@\S+\.\S+/.test(email);

}

/*SUBMIT*/
form.addEventListener("submit", (event) => {

  event.preventDefault();

  clearErrors();

  let isValid = true;

  /*NOME*/
  if(nome.value.trim() === ""){

    nomeError.textContent = "O nome é obrigatório";

    nome.classList.add("input-error");

    isValid = false;

  }

  /*EMAIL*/
  if(email.value.trim() === ""){

    emailError.textContent = "O email é obrigatório";

    email.classList.add("input-error");

    isValid = false;

  }
  else if(!isValidEmail(email.value)){

    emailError.textContent = "Digite um email válido";

    email.classList.add("input-error");

    isValid = false;

  }

  /*SENHA*/
  if(senha.value.trim() === ""){

    senhaError.textContent = "A senha é obrigatória";

    senha.classList.add("input-error");

    isValid = false;

  }
  else if(senha.value.length < 6){

    senhaError.textContent = "A senha deve ter no mínimo 6 caracteres";

    senha.classList.add("input-error");

    isValid = false;

  }

  /*CONFIRMAR SENHA*/
  if(confirmar.value.trim() === ""){

    confirmarError.textContent = "Confirme sua senha";

    confirmar.classList.add("input-error");

    isValid = false;

  }
  else if(confirmar.value !== senha.value){

    confirmarError.textContent = "As senhas não coincidem";

    confirmar.classList.add("input-error");

    isValid = false;

  }

  /*EMAIL JÁ EXISTE*/
  const userExists = findUserByEmail(email.value);

  if(userExists){

    emailError.textContent = "Esse email já está cadastrado";

    email.classList.add("input-error");

    isValid = false;

  }

  /*PARAR EXECUÇÃO*/
  if(!isValid){

    return;

  }

  /*OBJETO USUÁRIO*/
  const user = {

    nome: nome.value,
    email: email.value,
    senha: senha.value

  };

 createUser(user);

showToast(
  "Conta criada com sucesso!"
);

form.reset();

setTimeout(() => {

  window.location.href =
    "../login/index.html";

}, 1500);

});