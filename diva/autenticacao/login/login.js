import {
  findUserByEmail
} from "../../core/storage.js";

/* FORM */
const form = document.querySelector("form");

/* INPUTS */
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

/* ERROS */
const emailError = document.querySelector("#email-error");
const senhaError = document.querySelector("#senha-error");

/*LIMPAR ERROS*/
function clearErrors(){

  emailError.textContent = "";
  senhaError.textContent = "";

  email.classList.remove("input-error");
  senha.classList.remove("input-error");

}

/*VALIDAR EMAIL*/
function isValidEmail(emailValue){

  return /\S+@\S+\.\S+/.test(emailValue);

}

/*LOGIN*/
form.addEventListener("submit", (event) => {

  event.preventDefault();

  clearErrors();

  let isValid = true;

  /*VALIDAR EMAIL */
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

  /*VALIDAR SENHA*/
  if(senha.value.trim() === ""){

    senhaError.textContent = "A senha é obrigatória";

    senha.classList.add("input-error");

    isValid = false;

  }

  /*PARAR EXECUÇÃO */
  if(!isValid){

    return;

  }

  /*BUSCAR USUÁRIO */
  const user = findUserByEmail(email.value);

  /*USUÁRIO NÃO EXISTE*/
  if(!user){

    emailError.textContent = "Usuário não encontrado";

    email.classList.add("input-error");

    return;

  }

  /*SENHA INCORRETA*/
  if(user.senha !== senha.value){

    senhaError.textContent = "Senha incorreta";

    senha.classList.add("input-error");

    return;

  }

  /*LOGIN REALIZADO*/
  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(user)
  );

  /*SUCESSO*/
  alert(`Bem-vinda ${user.nome}!`);

  /*REDIRECIONAR*/
  window.location.href = "../../index.html";

});