import { findUserByEmail } from "../../../../core/storage.js";

export class LoginService {
  
  static authenticate(email, senha) {
    const user = findUserByEmail(email);

    if (!user) {
      return { success: false, errorType: "email", message: "Usuário não encontrado" };
    }

    if (user.senha !== senha) {
      return { success: false, errorType: "senha", message: "Senha incorreta" };
    }

    return { success: true, user };
  }

  static createSession(user) {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
  }
}