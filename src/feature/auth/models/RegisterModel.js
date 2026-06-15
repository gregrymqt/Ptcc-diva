export class RegistroModel {
  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  static validate(nome, email, senha, confirmar) {
    const errors = {};

    if (nome.trim() === "") {
      errors.nome = "O nome é obrigatório";
    }

    if (email.trim() === "") {
      errors.email = "O email é obrigatório";
    } else if (!this.isValidEmail(email)) {
      errors.email = "Digite um email válido";
    }

    if (senha.trim() === "") {
      errors.senha = "A senha é obrigatória";
    } else if (senha.length < 6) {
      errors.senha = "A senha deve ter no mínimo 6 caracteres";
    }

    if (confirmar.trim() === "") {
      errors.confirmar = "Confirme a sua senha";
    } else if (confirmar !== senha) {
      errors.confirmar = "As senhas não coincidem";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}