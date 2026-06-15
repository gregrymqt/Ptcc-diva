export class LoginForm {
  constructor(containerQuery = "#app") {
    this.container = document.querySelector(containerQuery);
  }

  /**
   * Injeta o HTML dinamicamente e captura as referências do DOM
   */
  render() {
    if (!this.container) {
      console.warn(`Container para LoginForm não encontrado.`);
      return;
    }

    this.container.innerHTML = `
      <div class="login-card">
        <div class="login-header">
          <h1>Seja bem-vinda</h1>
          <p>Entre para conferir suas linhas de beleza favoritas e gerenciar seus pedidos.</p>
        </div>

        <form novalidate>
          <div class="input-container">
            <input type="email" id="email" required placeholder=" ">
            <label for="email">E-mail</label>
            <span class="error-message" id="email-error"></span>
          </div>

          <div class="input-container">
            <input type="password" id="senha" required placeholder=" ">
            <label for="senha">Senha</label>
            <span class="error-message" id="senha-error"></span>
          </div>

          <button class="btn-login" type="submit">
            <span>Entrar na Conta</span>
          </button>
        </form>

        <div class="login-footer">
          <p>Não possui conta? <a href="../pages/register.html">Criar minha conta</a></p>
        </div>
      </div>
    `;

    // Mapeamento dos elementos logo após o HTML ser acoplado ao DOM
    this.form = this.container.querySelector("form");
    this.emailInput = this.container.querySelector("#email");
    this.senhaInput = this.container.querySelector("#senha");
    this.emailError = this.container.querySelector("#email-error");
    this.senhaError = this.container.querySelector("#senha-error");
  }

  getValues() {
    return {
      email: this.emailInput.value,
      senha: this.senhaInput.value
    };
  }

  clearErrors() {
    this.emailError.textContent = "";
    this.senhaError.textContent = "";
    this.emailInput.classList.remove("input-error");
    this.senhaInput.classList.remove("input-error");
  }

  showError(field, message) {
    if (field === "email") {
      this.emailError.textContent = message;
      this.emailInput.classList.add("input-error");
      this.emailInput.focus();
    } else if (field === "senha") {
      this.senhaError.textContent = message;
      this.senhaInput.classList.add("input-error");
      this.senhaInput.focus();
    }
  }
}