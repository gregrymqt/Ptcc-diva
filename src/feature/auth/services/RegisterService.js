import { createUser, findUserByEmail } from "../../../core/storage.js";
import { ROLES } from "../../../core/rolesManager.js"; // Importando do novo manager que criámos

export class RegisterService {
  static register(nome, email, senha) {
    // 1. Verifica se o email já está em uso
    const userExists = findUserByEmail(email);

    if (userExists) {
      return { success: false, errorType: "email", message: "Este e-mail já está cadastrado." };
    }

    // 2. Cria o objeto do usuário definindo a role padrão como "user"
    const newUser = {
      nome,
      email,
      senha,
      role: ROLES.USER // Garante que novos cadastros não são admins por engano
    };

    // 3. Guarda na base de dados (localStorage)
    try {
      createUser(newUser);
      return { success: true };
    } catch (e) {
      return { success: false, errorType: "geral", message: "Erro inesperado ao criar usuário." };
    }
  }
}