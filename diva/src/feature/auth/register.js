import { RegistroModel } from "./models/RegistroModel.js";
import { RegistroService } from "./services/RegistroService.js";
import { RegistroForm } from "./components/RegistroForm.js";
import { showToast } from "../../../shared/toastComponent.js"; // Verifique o caminho exato no seu projeto

// 1. Inicializa e renderiza a interface dinamicamente
const registroForm = new RegistroForm("#app");
registroForm.render();

// 2. Ouve o evento de submissão do formulário
registroForm.form.addEventListener("submit", (event) => {
  event.preventDefault();

  registroForm.clearErrors();

  const { nome, email, senha, confirmar } = registroForm.getValues();

  // Validação pura de formato e regras locais (Modelo)
  const validation = RegistroModel.validate(nome, email, senha, confirmar);
  
  if (!validation.isValid) {
    // Exibe todos os erros encontrados na interface
    Object.keys(validation.errors).forEach(field => {
      registroForm.showError(field, validation.errors[field]);
    });
    return;
  }

  // Regra de Negócio: Registo no armazenamento (Serviço)
  const registoResult = RegistroService.register(nome, email, senha);
  
  if (!registoResult.success) {
    // Retorna erro caso o email já exista, etc.
    registroForm.showError(registoResult.errorType, registoResult.message);
    return;
  }

  // Sucesso
  showToast("Conta criada com sucesso! Bem-vinda à Diva.");
  registroForm.reset();

  // Redireciona para o login após 1.5 segundos
  setTimeout(() => {
    window.location.href = "../../login/pages/index.html"; 
  }, 1500);
});