import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";
import { PdpComponent } from "./components/PdpComponent.js";
import { findProductById } from "./services/productServices.js";
import { addToCart } from "../cart/services/cartServices.js";
import { openCartDrawer } from "../cart/components/CartDrawerComponent.js";

async function initPdp() {
  const navbarEl = document.getElementById("navbar");
  if (navbarEl) navbarEl.innerHTML = navbarComponent();
  
  // Loading state
  const contentEl = document.getElementById("content");
  if (!contentEl) {
    console.warn("Container #content não encontrado na PDP.");
    return;
  }
  
  contentEl.innerHTML = '<div style="text-align:center; padding: 100px;">Carregando detalhes do produto...</div>';

  // Injetar PDP
  const pdpHtml = await PdpComponent();
  contentEl.innerHTML = pdpHtml;
  
  const footerEl = document.getElementById("footer");
  if (footerEl) footerEl.innerHTML = footerComponent();
  
  initNavbar();
  
  // Após injetar no DOM, inicializar as micro-interações
  initPdpInteractions();
}

function initPdpInteractions() {
  const swatches = document.querySelectorAll('.swatch');
  const mainImage = document.getElementById('pdp-main-image');
  const selectedColorName = document.getElementById('pdp-selected-color');

  if (swatches.length > 0 && mainImage) {
    swatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        // Remover classe active de todos
        swatches.forEach(s => s.classList.remove('active'));
        
        // Adicionar active no clicado
        const target = e.currentTarget;
        target.classList.add('active');

        // Trocar imagem (Micro-interação suave)
        const newImage = target.getAttribute('data-image');
        const newColorName = target.getAttribute('data-colorname');

        // Efeito de fade out rápido
        mainImage.style.opacity = 0.5;
        
        setTimeout(() => {
          mainImage.src = newImage;
          selectedColorName.textContent = newColorName;
          mainImage.style.opacity = 1;
        }, 150);
      });
    });
  }

  // Botão Adicionar à Sacola
  const btnAdd = document.getElementById('btn-add-cart');
  if (btnAdd) {
    btnAdd.addEventListener('click', async () => {
      const activeColor = document.querySelector('.swatch.active')?.getAttribute('data-colorname') || 'Única';
      
      // Feedback visual inicial
      const originalText = btnAdd.textContent;
      btnAdd.textContent = 'Adicionando...';
      btnAdd.disabled = true;
      btnAdd.style.backgroundColor = '#2c2c2c';
      btnAdd.style.color = '#fff';
      
      // Pegar produto para adicionar
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const product = await findProductById(id);

      if(product) {
        await addToCart(product, activeColor);
        btnAdd.textContent = 'Adicionado ✔';
        openCartDrawer();
      } else {
        btnAdd.textContent = 'Erro ao adicionar';
      }

      setTimeout(() => {
        btnAdd.textContent = originalText;
        btnAdd.style.backgroundColor = '';
        btnAdd.style.color = '';
        btnAdd.disabled = false;
      }, 2000);
    });
  }
}

initPdp();
