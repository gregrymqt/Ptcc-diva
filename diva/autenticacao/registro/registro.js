import {
  createUser,
  findUserByEmail
} from "../core/storage.js";

/*PEGAR FORMULÁRIO*/
const form = document.querySelector("form");

/*EVENTO DE SUBMIT*/
form.addEventListener("submit", (event) => {

  /* EVITA RECARREGAR A PÁGINA */
  event.preventDefault();

  /*PEGAR VALORES DOS INPUTS*/
  const nome = document.querySelector("#nome").value;

  const email = document.querySelector("#email").value;

  const senha = document.querySelector("#senha").value;

  const confirmar = document.querySelector("#confirmar").value;

  /*VALIDAÇÕES*/

  /* CAMPOS VAZIOS */
  if(!nome || !email || !senha || !confirmar){

    alert("Preencha todos os campos");

    return;

  }

  /* SENHAS DIFERENTES */
  if(senha !== confirmar){

    alert("As senhas não coincidem");

    return;

  }

  /* VERIFICAR EMAIL EXISTENTE */
  const userExists = findUserByEmail(email);

  if(userExists){

    alert("Esse email já está cadastrado");

    return;

  }

  /*CRIAR OBJETO USUÁRIO*/
  const user = {

    nome,
    email,
    senha

  };

  /*SALVAR USUÁRIO*/
  createUser(user);

  /* SUCESSO */
  alert("Conta criada com sucesso!");

  /*LIMPAR FORMULÁRIO*/
  form.reset();

  /*REDIRECIONAR*/
  window.location.href = "../login/index.html";

});