import { createUser, findUserByEmail } from "../../../../core/storage.js";
import { ROLES } from "../../../../core/rolesManager.js"; // Importando do novo manager que criámos

export class RegistroService {
  static register(nome, email, senha) {
    // 1. Verifica se o email já está em uso
    const userExists = findUserByEmail(email);

    if (userExists) {
      return { success: false, errorType: "email", message: "Este email já está registado." };
    }

    // 2. Cria o objeto do utilizador definindo a role padrão como "user"
    const newUser = {
      nome,
      email,
      senha,
      role: ROLES.USER // Garante que novos registos não são admins por engano
    };

    // 3. Guarda na base de dados (localStorage)
    createUser(newUser);

    return { success: true };
  }
}