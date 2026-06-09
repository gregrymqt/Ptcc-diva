import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";
import { PdpComponent } from "./components/PdpComponent.js";

async function initPdp() {
  document.getElementById("navbar").innerHTML = navbarComponent();
  
  // Loading state
  const contentEl = document.getElementById("content");
  contentEl.innerHTML = '<div style="text-align:center; padding: 100px;">Carregando detalhes do produto...</div>';

  // Injetar PDP
  const pdpHtml = await PdpComponent();
  contentEl.innerHTML = pdpHtml;
  
  document.getElementById("footer").innerHTML = footerComponent();
  
  initNavbar();
  
  // Após injetar no DOM, inicializar as micro-interações
  initPdpInteractions();
}

function initPdpInteractions() {
  const swatches = document.querySelectorAll('.swatch');
  const mainImage = document.getElementById('pdp-main-image');
  const selectedColorName = document.getElementById('pdp-selected-color');

  if (swatches.length === 0 || !mainImage) return;

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

  // Botão Adicionar à Sacola
  const btnAdd = document.getElementById('btn-add-cart');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const activeColor = document.querySelector('.swatch.active')?.getAttribute('data-colorname') || 'Única';
      
      // Feedback visual
      const originalText = btnAdd.textContent;
      btnAdd.textContent = 'Adicionado ✔';
      btnAdd.style.backgroundColor = '#2c2c2c'; // Muda para cor de sucesso (nicho luxo/clean usa preto ou cinza escuro)
      btnAdd.style.color = '#fff';
      
      // Opcional: Aqui integraria com o carrinho/localStorage
      console.log(`Adicionado à sacola: Cor ${activeColor}`);

      setTimeout(() => {
        btnAdd.textContent = originalText;
        btnAdd.style.backgroundColor = '';
        btnAdd.style.color = '';
      }, 2000);
    });
  }
}

initPdp();
