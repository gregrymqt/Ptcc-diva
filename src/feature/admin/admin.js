import { protectAdminPage } from "../../core/rolesManager.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";
import { injetarSidebar } from "../../shared/components/sidebar/sidebarComponent.js";
import { aboutFormComponent } from "../about/components/aboutFormComponent.js";
import { aboutListComponent } from "../about/components/aboutListComponent.js";

// Importando os Controladores Isolados de cada aba
import { carregarModuloHome } from "./controllers/adminHomeController.js";
import { carregarModuloCategorias } from "./controllers/adminCategoriesController.js";
import { carregarModuloProdutos } from "./controllers/adminProductsController.js";
import { carregarModuloAbout } from "./controllers/adminAboutController.js";
import { carregarModuloPedidos } from "./controllers/adminOrdersController.js";
// 1. Proteger página para garantir que apenas admin acesse
protectAdminPage();

// 2. Montar layout principal (Navbar e Footer)
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();
initNavbar();

// 3. Injeção da Sidebar
var itensMenuAdmin = [
    { id: 'view-home', nome: 'Home (Hero)', icone: '🏠', link: '#' },
    { id: 'view-produtos', nome: 'Produtos', icone: '📦', link: '#' },
    { id: 'view-categorias', nome: 'Categorias', icone: '🏷️', link: '#' },
    { id: 'view-pedidos', nome: 'Pedidos', icone: '🛒', link: '#' },
    { id: 'view-about', nome: 'Sobre Nós', icone: '🖼️', link: '#' }
];

injetarSidebar('admin-sidebar-container', itensMenuAdmin, { tituloMobile: 'Admin Diva' });

var linksSidebar = document.querySelectorAll("#admin-sidebar-container .sidebar-link");
for (var i = 0; i < linksSidebar.length; i++) {
    linksSidebar[i].onclick = (function(idView) {
        return function(e) {
            e.preventDefault();
            window.mudarViewAdmin(idView);
            
            for (var j = 0; j < linksSidebar.length; j++) {
                linksSidebar[j].classList.remove("active");
            }
            this.classList.add("active");
        };
    })(itensMenuAdmin[i].id);
}

// 4. Motor de Renderização de Views
window.mudarViewAdmin = function(idView) {
    var contentArea = document.getElementById("admin-main-content");
    var titulo = "";
    var formHtml = "";
    var listHtml = "";

    if (idView === 'view-home') {
        titulo = "Configurações da Home (Hero)";
        formHtml = '<div id="admin-home-form-container"></div>';
        listHtml = '<div id="admin-home-list-container"></div>';
    } else if (idView === 'view-produtos') {
        titulo = "Gestão de Produtos";
        formHtml = '<div id="admin-product-form-container"></div>';
        listHtml = '<div id="admin-products-list"></div>';
    } else if (idView === 'view-categorias') {
        titulo = "Gestão de Categorias";
        formHtml = '<div id="admin-category-form-container"></div>';
        listHtml = '<div id="admin-categories-list"></div>';
    } else if (idView === 'view-pedidos') {
        titulo = "Gestão de Pedidos";
        formHtml = '<div id="admin-orders-form-container" style="padding: 2rem; color: #666; text-align: center;"><p>Os pedidos são processados pelo checkout da loja. <br>Utilize a aba "Consultar" para visualizar os recebidos.</p></div>';
        listHtml = '<div id="admin-orders-list"></div>';
    } else if (idView === 'view-about') {
        titulo = "Imagens da Seção Sobre";
        formHtml = aboutFormComponent();
        listHtml = aboutListComponent();
    }

    contentArea.innerHTML = 
        '<div class="admin-container">' +
            '<header class="admin-header">' +
                '<h1>' + titulo + '</h1>' +
                '<p>Gerencie as informações do seu painel.</p>' +
            '</header>' +
            renderizarEstruturaAbas(formHtml, listHtml) +
        '</div>';

    configurarComportamentoAbas();

    if (idView === 'view-home') {
        carregarModuloHome();
    } else if (idView === 'view-categorias') {
        carregarModuloCategorias();
    } else if (idView === 'view-produtos') {
        carregarModuloProdutos();
    } else if (idView === 'view-pedidos') {
        carregarModuloPedidos();
    } else if (idView === 'view-about') {
        carregarModuloAbout();
    }
};

// 5. Motor de Abas (Tabs)
function renderizarEstruturaAbas(formHtml, listHtml) {
    return '<div class="admin-tabs-container">' +
               '<div class="admin-tabs">' +
                   '<button id="btn-tab-form" class="admin-tab active">Cadastrar</button>' +
                   '<button id="btn-tab-list" class="admin-tab">Consultar</button>' +
               '</div>' +
               '<div id="tab-content-form" class="tab-content active">' + formHtml + '</div>' +
               '<div id="tab-content-list" class="tab-content" style="display:none;">' + listHtml + '</div>' +
           '</div>';
}

function configurarComportamentoAbas() {
    var btnForm = document.getElementById("btn-tab-form");
    var btnList = document.getElementById("btn-tab-list");
    var contentForm = document.getElementById("tab-content-form");
    var contentList = document.getElementById("tab-content-list");

    if (btnForm && btnList && contentForm && contentList) {
        btnForm.addEventListener("click", function() {
            btnForm.className = "admin-tab active";
            btnList.className = "admin-tab";
            contentForm.style.display = "block";
            contentList.style.display = "none";
        });

        btnList.addEventListener("click", function() {
            btnForm.className = "admin-tab";
            btnList.className = "admin-tab active";
            contentForm.style.display = "none";
            contentList.style.display = "block";
        });
    }
}

// Iniciar a primeira view (Home) por padrão
window.mudarViewAdmin('view-home');
