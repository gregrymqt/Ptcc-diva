import { navbarComponent } from "../../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../../shared/components/navbar/navbarController.js";
import { getCart, getCartTotals } from "../../cart/services/cartServices.js";
import { CheckoutComponent } from "../components/CheckoutComponent.js";
import { createOrder } from "../services/checkoutServices.js";
import { showToast } from "../../../shared/components/toast/toast.js";

async function renderCheckout() {
  const cartItems = await getCart();
  const totals = await getCartTotals();
  
  const contentDiv = document.getElementById("checkout-content");
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
  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
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
      }
    });
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = navbarComponent();
  document.getElementById("footer").innerHTML = footerComponent();
  initNavbar();
  
  await renderCheckout();
});
