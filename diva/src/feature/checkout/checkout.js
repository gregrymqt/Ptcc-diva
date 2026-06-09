import { navbarComponent } from "../../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../../shared/components/navbar/navbarController.js";
import { getCart, getCartTotals } from "../../cart/services/cartServices.js";
import { CheckoutComponent } from "../components/CheckoutComponent.js";
import { createOrder } from "../services/checkoutServices.js";
import { showToast } from "../../../shared/components/toast/toast.js";
import { getStorageData } from "../../../core/storage.js";

async function renderCheckout() {
  const usuarioLogado = await getStorageData("usuarioLogado");
  if (!usuarioLogado) {
    showToast("Acesso restrito. Faça login para finalizar sua compra.", "error");
    setTimeout(() => {
      window.location.href = "../../auth/login/pages/index.html";
    }, 2000);
    return;
  }
  const cartItems = await getCart();
  const totals = await getCartTotals();
  
  const contentDiv = document.getElementById("checkout-content");
  if (!contentDiv) {
    console.warn("Container #checkout-content não encontrado.");
    return;
  }
  
  contentDiv.innerHTML = CheckoutComponent(cartItems, totals);

  // Lógica para mostrar/esconder campos do cartão
  const radiosPagamento = document.querySelectorAll('input[name="pagamento"]');
  const creditCardFields = document.getElementById('credit-card-fields');
  
  radiosPagamento.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if(e.target.value === 'cartao') {
        creditCardFields.classList.remove('hidden');
      } else {
        creditCardFields.classList.add('hidden');
      }
    });
  });

  // Listener para o submit do formulário
  const form = document.getElementById('checkout-form');
  const btnSubmit = form ? form.querySelector('.btn-checkout') : null;
  const inputCep = document.getElementById('cep');
  const inputCcNum = document.getElementById('cc-num');

  // Máscara e Validação de CEP
  if (inputCep) {
    inputCep.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove não números
      value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // Coloca o hífen
      e.target.value = value.slice(0, 9); // Limita a 9 caracteres

      // Validação do botão (precisa ter 9 caracteres e carrinho não estar vazio)
      if (btnSubmit && cartItems.length > 0) {
        btnSubmit.disabled = e.target.value.length !== 9;
      }
    });
  }

  // Máscara Cartão de Crédito
  if (inputCcNum) {
    inputCcNum.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Adiciona espaço a cada 4 números
      e.target.value = value.slice(0, 19);
    });
  }

  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (btnSubmit) {
        btnSubmit.textContent = "Processando seu Pedido...";
        btnSubmit.disabled = true;
      }
      
      const formData = new FormData(form);
      const dadosEntrega = {
        cep: formData.get('cep'),
        rua: formData.get('rua'),
        numero: formData.get('numero'),
        bairro: formData.get('bairro'),
        cidade: formData.get('cidade')
      };
      const formaPagamento = formData.get('pagamento');

      try {
        await createOrder(dadosEntrega, formaPagamento);
        showToast("Pedido realizado com sucesso!", "success");
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          window.location.href = "../../../index.html";
        }, 2000);
      } catch (error) {
        showToast("Erro ao processar pedido: " + error.message, "error");
        if (btnSubmit) {
          btnSubmit.textContent = "Finalizar Pedido";
          btnSubmit.disabled = false;
        }
      }
    });
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", async () => {
  const navbarEl = document.getElementById("navbar");
  if (navbarEl) navbarEl.innerHTML = navbarComponent();
  
  const footerEl = document.getElementById("footer");
  if (footerEl) footerEl.innerHTML = footerComponent();
  
  if (navbarEl) initNavbar();
  
  await renderCheckout();
});
