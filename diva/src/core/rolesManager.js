import { findUserByEmail, updateUser } from "./storage.js";
import { showToast } from "../shared/components/toast/toastComponent.js"; // Ajuste o caminho do toast se necessário

export const ROLES = {
  ADMIN: "admin",
  USER: "user"
};

/* ==========================================================================
   CRUD DE ROLES
   ========================================================================== */

/**
 * Atribui uma role (admin/user) para um usuário específico via e-mail.
 */
export function setUserRole(email, role) {
  if (role !== ROLES.ADMIN && role !== ROLES.USER) {
    console.error("Role inválida. Use 'admin' ou 'user'.");
    return;
  }
  
  updateUser(email, { role });
}

/**
 * Retorna a role do usuário. Caso não tenha nenhuma, define como 'user' por padrão.
 */
export function getUserRole(email) {
  const user = findUserByEmail(email);
  return user ? user.role || ROLES.USER : null;
}

/* ==========================================================================
   GUARD (VERIFICAÇÃO E REDIRECIONAMENTO)
   ========================================================================== */

/**
 * Guarda de rota: Verifica se o usuário atual é admin. 
 * Se não for, exibe um toast e redireciona para a home.
 */
export function protectAdminPage() {
  // Recupera a sessão do usuário logado (ajuste a chave conforme seu sistema de login)
  const session = localStorage.getItem("usuarioLogado");

  if (!session) {
    redirectWithAlert();
    return;
  }

  let email;
  try {
    // Caso você salve o objeto do usuário completo na sessão
    const parsedSession = JSON.parse(session);
    email = parsedSession.email;
  } catch (e) {
    // Caso você salve apenas a string do e-mail na sessão
    email = session;
  }

  const currentRole = getUserRole(email);

  if (currentRole !== ROLES.ADMIN) {
    redirectWithAlert();
  }
}

/**
 * Função auxiliar para disparar o aviso e tirar o usuário da página
 */
function redirectWithAlert() {
  showToast("Acesso negado. Redirecionando para a home...", 2500);
  
  // Aguarda o tempo do toast para fazer o redirecionamento fluído
  setTimeout(() => {
    window.location.href = "/index.html"; // Ajuste o caminho para a sua Home se necessário
  }, 2000);
}