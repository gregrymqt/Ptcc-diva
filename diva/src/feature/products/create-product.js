import { protectAdminPage } from "../../core/rolesManager.js";
import { initProductForm } from "./components/productFormComponent.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";
import { AdminOrdersComponent } from "./components/AdminOrdersComponent.js";

// 1. GUARDA DE ROTA: Verifica a permissão antes de renderizar a página
protectAdminPage();

async function initAdminPanel() {
  // 2. RENDERIZAÇÃO DA INTERFACE BÁSICA
  document.getElementById("navbar").innerHTML = navbarComponent();
  document.getElementById("footer").innerHTML = footerComponent();
  initNavbar();

  // 3. INICIALIZAÇÃO DO FORMULÁRIO DE PRODUTO
  initProductForm("product-form");

  // 4. LÓGICA DAS ABAS (TABS)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      // Remove 'active' de todos os botões e conteúdos
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Adiciona 'active' na aba clicada
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');

      // Se clicou na aba de pedidos, renderiza a lista
      if (targetId === 'tab-pedidos') {
        const ordersContainer = document.getElementById('admin-orders-container');
        ordersContainer.innerHTML = '<div class="loading">Carregando pedidos...</div>';
        try {
          const ordersHtml = await AdminOrdersComponent();
          ordersContainer.innerHTML = ordersHtml;
        } catch (error) {
          ordersContainer.innerHTML = '<div class="error-message">Erro ao carregar pedidos.</div>';
          console.error(error);
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initAdminPanel);