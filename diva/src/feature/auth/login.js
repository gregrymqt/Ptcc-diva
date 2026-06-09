import { LoginModel } from "./models/LoginModel.js";
import { LoginService } from "./services/LoginService.js";
import { LoginForm } from "./components/LoginForm.js";
import { showToast } from "../../../shared/toastComponent.js"; 

// 1. Inicializa e renderiza a interface dinamicamente
const loginForm = new LoginForm("#app");
loginForm.render();

// 2. Escuta os eventos gerados pela interface renderizada
loginForm.form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  loginForm.clearErrors();

  const { email, senha } = loginForm.getValues();

  // Validação pura da regra de formato (Model)
  const validation = LoginModel.validate(email, senha);
  if (!validation.isValid) {
    if (validation.errors.email) loginForm.showError("email", validation.errors.email);
    if (validation.errors.senha) loginForm.showError("senha", validation.errors.senha);
    return;
  }

  // Validação de autenticação de dados (Service)
  const authResult = LoginService.authenticate(email, senha);
  if (!authResult.success) {
    loginForm.showError(authResult.errorType, authResult.message);
    return;
  }

  // Persistência e Fluxo de Sucesso
  LoginService.createSession(authResult.user);
  showToast(`Que bom ter você de volta, ${authResult.user.nome}!`);

  setTimeout(() => {
    window.location.href = "../../../index.html"; 
  }, 1500);
});