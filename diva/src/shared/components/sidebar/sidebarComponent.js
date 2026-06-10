/**
 * src/shared/components/sidebar/sidebarComponent.js
 * 
 * Componente genérico de Sidebar (Mobile-First)
 * Criado seguindo as diretrizes de "Refatoração Reversa":
 * - Sem Arrow Functions (uso de function)
 * - Sem métodos modernos de iteração (uso de for clássico)
 * - Sem desestruturação complexa
 */

/**
 * Função principal para injetar a Sidebar no DOM
 * 
 * @param {string} idContainer - ID do elemento onde a sidebar será renderizada (ex: 'app-layout')
 * @param {Array} itensMenu - Array de objetos { icone, nome, link, ativo }
 * @param {Object} config - Configurações opcionais { tituloMobile, tituloSidebar }
 */
export function injetarSidebar(idContainer, itensMenu, config) {
    var containerPrincipal = document.getElementById(idContainer);
    
    if (!containerPrincipal) {
        console.error("Erro: Container com ID '" + idContainer + "' não encontrado.");
        return;
    }

    // Tratamento de configurações com fallbacks tradicionais
    var configuracoes = config || {};
    var tituloMobile = configuracoes.tituloMobile || "Menu";
    var tituloSidebar = configuracoes.tituloSidebar || "Diva Makeup";

    // 1. Constrói o Header Mobile
    var htmlMobileHeader = 
        "<div class='sidebar-mobile-header'>" +
            "<button class='sidebar-hamburger-btn' id='btn-abrir-sidebar' aria-label='Abrir Menu'>" +
                "&#9776;" + // Ícone Hamburger
            "</button>" +
            "<h2 class='sidebar-mobile-title'>" + tituloMobile + "</h2>" +
            "<div></div>" + // Elemento vazio para equilibrar o flexbox (título no meio)
        "</div>";

    // 2. Constrói o Overlay Escuro (Mobile)
    var htmlOverlay = "<div class='sidebar-overlay' id='sidebar-overlay'></div>";

    // 3. Constrói a Sidebar (Aside)
    var htmlSidebar = 
        "<aside class='sidebar-container' id='sidebar-aside'>" +
            "<div class='sidebar-header'>" +
                "<span class='sidebar-brand'>" + tituloSidebar + "</span>" +
                "<button class='sidebar-close-btn' id='btn-fechar-sidebar' aria-label='Fechar Menu'>&times;</button>" +
            "</div>" +
            "<nav class='sidebar-nav'>";

    // Laço tradicional para os itens de navegação
    if (itensMenu && itensMenu.length > 0) {
        for (var i = 0; i < itensMenu.length; i++) {
            var item = itensMenu[i];
            var classeAtiva = item.ativo ? " active" : "";
            
            htmlSidebar += 
                "<a href='" + item.link + "' class='sidebar-link" + classeAtiva + "'>" +
                    "<span class='sidebar-link-icon'>" + item.icone + "</span>" +
                    "<span class='sidebar-link-text'>" + item.nome + "</span>" +
                "</a>";
        }
    }

    htmlSidebar += 
            "</nav>" +
        "</aside>";

    // Prepara o Container Principal
    containerPrincipal.classList.add("layout-com-sidebar");

    // Injeta os elementos HTML no início do container principal sem destruir o que já existe
    var htmlFinal = htmlMobileHeader + htmlOverlay + htmlSidebar;
    containerPrincipal.insertAdjacentHTML('afterbegin', htmlFinal);

    // Configura os eventos da sidebar de forma tradicional
    configurarEventosSidebar();
}

/**
 * Função tradicional para lidar com os eventos de abrir e fechar a sidebar (Mobile)
 */
function configurarEventosSidebar() {
    var btnAbrir = document.getElementById("btn-abrir-sidebar");
    var btnFechar = document.getElementById("btn-fechar-sidebar");
    var sidebar = document.getElementById("sidebar-aside");
    var overlay = document.getElementById("sidebar-overlay");

    if (!btnAbrir || !btnFechar || !sidebar || !overlay) {
        return;
    }

    // Função interna tradicional para abrir o menu
    function abrirSidebar() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Evita rolagem da página no mobile
    }

    // Função interna tradicional para fechar o menu
    function fecharSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Restaura rolagem
    }

    // Vincula os eventos aos elementos
    btnAbrir.addEventListener("click", abrirSidebar);
    btnFechar.addEventListener("click", fecharSidebar);
    overlay.addEventListener("click", fecharSidebar);
}
