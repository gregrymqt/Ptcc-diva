export class RegistroForm {
  constructor(containerQuery = "#app") {
    this.container = document.querySelector(containerQuery);
  }

  render() {
    this.container.innerHTML = `
      <div class="login-card">
        <div class="login-header">
          <h1>Criar Conta</h1>
          <p>Junte-se à Diva e tenha acesso a produtos exclusivos de beleza.</p>
        </div>

        <form novalidate>
          <div class="input-container">
            <input type="text" id="nome" required placeholder=" ">
            <label for="nome">Nome Completo</label>
            <span class="error-message" id="nome-error"></span>
          </div>

          <div class="input-container">
            <input type="email" id="email" required placeholder=" ">
            <label for="email">E-mail</label>
            <span class="error-message" id="email-error"></span>
          </div>

          <div class="input-container">
            <input type="password" id="senha" required placeholder=" ">
            <label for="senha">Senha (Mínimo 6 caracteres)</label>
            <span class="error-message" id="senha-error"></span>
          </div>

          <div class="input-container">
            <input type="password" id="confirmar" required placeholder=" ">
            <label for="confirmar">Confirmar Senha</label>
            <span class="error-message" id="confirmar-error"></span>
          </div>

          <button class="btn-login" type="submit">
            <span>Registar Conta</span>
          </button>
        </form>

        <div class="login-footer">
          <p>Já possui conta? <a href="../../login/pages/index.html">Entrar agora</a></p>
        </div>
      </div>
    `;

    // Mapeamento dos elementos no DOM
    this.form = this.container.querySelector("form");
    this.inputs = {
      nome: this.container.querySelector("#nome"),
      email: this.container.querySelector("#email"),
      senha: this.container.querySelector("#senha"),
      confirmar: this.container.querySelector("#confirmar")
    };
    this.errors = {
      nome: this.container.querySelector("#nome-error"),
      email: this.container.querySelector("#email-error"),
      senha: this.container.querySelector("#senha-error"),
      confirmar: this.container.querySelector("#confirmar-error")
    };
  }

  getValues() {
    return {
      nome: this.inputs.nome.value,
      email: this.inputs.email.value,
      senha: this.inputs.senha.value,
      confirmar: this.inputs.confirmar.value
    };
  }

  clearErrors() {
    Object.keys(this.errors).forEach(key => {
      this.errors[key].textContent = "";
      this.inputs[key].classList.remove("input-error");
    });
  }

  showError(field, message) {
    if (this.errors[field] && this.inputs[field]) {
      this.errors[field].textContent = message;
      this.inputs[field].classList.add("input-error");
      this.inputs[field].focus();
    }
  }

  reset() {
    this.form.reset();
  }
}