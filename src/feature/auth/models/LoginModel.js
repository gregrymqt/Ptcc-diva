export class LoginModel {
  static isValidEmail(email) {
    // Retorna true se o formato for válido
    return /\S+@\S+\.\S+/.test(email);
  }

  static validate(email, senha) {
    const errors = {};

    if (email.trim() === "") {
      errors.email = "O email é obrigatório";
    } else if (!this.isValidEmail(email)) {
      errors.email = "Digite um email válido";
    }

    if (senha.trim() === "") {
      errors.senha = "A senha é obrigatória";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}