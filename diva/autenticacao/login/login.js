import {
  findUserByEmail
} from "../core/storage.js";

/*PEGAR FORMULÁRIO*/
const form = document.querySelector("form");

/*EVENTO DE LOGIN*/
form.addEventListener("submit", (event) => {

  /* EVITA RECARREGAR */
  event.preventDefault();

  /*PEGAR VALORES*/
  const email = document.querySelector("#email").value;

  const senha = document.querySelector("#senha").value;

  /*VALIDAR CAMPOS*/
  if(!email || !senha){

    alert("Preencha todos os campos");

    return;

  }

  /*BUSCAR USUÁRIO*/
  const user = findUserByEmail(email);

  /*VERIFICAR USUÁRIO*/
  if(!user){

    alert("Usuário não encontrado");

    return;

  }

  /* VERIFICAR SENHA*/
  if(user.senha !== senha){

    alert("Senha incorreta");

    return;

  }

  /*LOGIN REALIZADO*/
  alert(`Bem-vinda ${user.nome}!`);

  /* SALVAR SESSÃO*/
  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(user)
  );

  /*REDIRECIONAR*/
  window.location.href = "../home/index.html";

});