import {
  findUserByEmail
} from "../../../core/storage.js";

import {
  showToast
}
from "../../../shared/components/toast/toastComponent.js";

/* FORM */
const form = document.querySelector("form");

/* INPUTS */
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

/* ERROS */
const emailError = document.querySelector("#email-error");
const senhaError = document.querySelector("#senha-error");

function clearErrors(){

  emailError.textContent = "";
  senhaError.textContent = "";

  email.classList.remove("input-error");
  senha.classList.remove("input-error");

}

function isValidEmail(emailValue){

  return /\S+@\S+\.\S+/.test(emailValue);

}

form.addEventListener("submit", (event) => {

  event.preventDefault();

  clearErrors();

  let isValid = true;

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

  if(senha.value.trim() === ""){

    senhaError.textContent = "A senha é obrigatória";

    senha.classList.add("input-error");

    isValid = false;

  }

  if(!isValid){

    return;

  }

  const user = findUserByEmail(email.value);

  if(!user){

    emailError.textContent = "Usuário não encontrado";

    email.classList.add("input-error");

    return;

  }

  if(user.senha !== senha.value){

    senhaError.textContent = "Senha incorreta";

    senha.classList.add("input-error");

    return;

  }

  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(user)
  );

  showToast(
    `Bem-vinda ${user.nome}!`
  );

  setTimeout(() => {

    window.location.href =
      "../../index.html";

  }, 1500);

});