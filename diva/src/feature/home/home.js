import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { homeContentComponent } from "./components/homeContentComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";

async function initHome() {
  document.getElementById("navbar").innerHTML = navbarComponent();
  
  // Renderizar placeholder ou loading se desejar (opcional)
  document.getElementById("content").innerHTML = '<div style="text-align:center; padding: 50px;">Carregando...</div>';

  // Aguardar a renderização assíncrona da Home
  const contentHtml = await homeContentComponent();
  document.getElementById("content").innerHTML = contentHtml;
  
  document.getElementById("footer").innerHTML = footerComponent();
  
  initNavbar();
}

initHome();