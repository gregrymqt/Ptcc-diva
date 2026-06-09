/* ================================================
   ROLES MANAGER — Gerencia os tipos de usuário
   (permissões) dentro da aplicação.

   Existem dois tipos de usuário:
   - "user"  → usuário comum, pode navegar e comprar
   - "admin" → administrador, pode cadastrar produtos
              e visualizar todos os pedidos
   ================================================ */

import { findUserByEmail, updateUser } from "./storage.js";
import { showToast } from "../shared/components/toast/toastComponent.js";

/* Define as roles disponíveis como constantes,
   para evitar erros de digitação no código. */
export var ROLES = {
  ADMIN: "admin",
  USER: "user"
};


/* --------------------------------------------------
   FUNÇÕES DE GERENCIAMENTO DE ROLES
   -------------------------------------------------- */

/* Atribui uma role (tipo de usuário) a alguém pelo e-mail.
   Só aceita "admin" ou "user". Qualquer outro valor é ignorado. */
export function setUserRole(email, role) {
  // Verifica se a role passada é válida
  if (role !== ROLES.ADMIN && role !== ROLES.USER) {
    console.error("Tipo de usuário inválido. Use 'admin' ou 'user'.");
    return;
  }

  // Atualiza o campo "role" do usuário no localStorage
  updateUser(email, { role: role });
}

/* Retorna qual é a role (tipo) de um usuário pelo e-mail.
   Se o usuário não tiver role definida, retorna "user" por padrão. */
export function getUserRole(email) {
  var usuario = findUserByEmail(email);

  // Se não encontrou o usuário, retorna null
  if (!usuario) {
    return null;
  }

  // Se o usuário tem uma role definida, retorna ela
  if (usuario.role) {
    return usuario.role;
  }

  // Caso contrário, considera como usuário comum
  return ROLES.USER;
}


/* --------------------------------------------------
   PROTEÇÃO DE PÁGINAS (GUARD)
   Impede que usuários comuns acessem páginas
   que são exclusivas de administradores.
   -------------------------------------------------- */

/* Verifica se o usuário atual é administrador.
   Se não for, exibe um aviso e redireciona para a página inicial.
   Deve ser chamada no início de qualquer página de admin. */
export function protectAdminPage() {
  // Busca os dados da sessão (quem está logado agora)
  var sessao = localStorage.getItem("usuarioLogado");

  // Se não há ninguém logado, redireciona imediatamente
  if (!sessao) {
    redirecionarComAviso();
    return;
  }

  // Tenta ler o e-mail do usuário logado
  var email;

  try {
    // Caso a sessão esteja salva como um objeto completo
    var sessaoParsed = JSON.parse(sessao);
    email = sessaoParsed.email;
  } catch (e) {
    // Caso a sessão seja apenas o e-mail em texto simples
    email = sessao;
  }

  // Busca a role (tipo) do usuário logado
  var roleAtual = getUserRole(email);

  // Se não for admin, barra o acesso e redireciona
  if (roleAtual !== ROLES.ADMIN) {
    redirecionarComAviso();
  }
}

/* Exibe um aviso de "Acesso Negado" e redireciona
   para a página inicial após 2 segundos.
   Função auxiliar usada internamente por protectAdminPage(). */
function redirecionarComAviso() {
  showToast("Acesso negado. Redirecionando para a home...", 2500);

  // Aguarda 2 segundos para o usuário ler o aviso antes de redirecionar
  setTimeout(function() {
    window.location.href = "/index.html";
  }, 2000);
}