import { protectAdminPage } from "../../core/rolesManager.js";
import { setStorageData, getStorageData } from "../../core/storage.js";
import { showToast } from "../../shared/components/toast/toastComponent.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";
import { adminFormComponent } from "./components/adminFormComponent.js";
import { adminListComponent } from "./components/adminListComponent.js";
import { adminTabsComponent } from "./components/adminTabsComponent.js";

// 1. Proteger página para garantir que apenas admin acesse
protectAdminPage();

// 2. Montar componentes
document.getElementById("navbar").innerHTML = navbarComponent();

document.getElementById("admin-content").innerHTML = 
    '<main class="admin-container">' +
        '<header class="admin-header">' +
            '<h1>Painel de Administração</h1>' +
            '<p>Configure as informações dinâmicas do site.</p>' +
        '</header>' +
        adminTabsComponent() +
        '<div id="admin-form-view" class="tab-content active">' + adminFormComponent() + '</div>' +
        '<div id="admin-list-view" class="tab-content" style="display: none;">' + adminListComponent() + '</div>' +
    '</main>';

document.getElementById("footer").innerHTML = footerComponent();
initNavbar();

window.selecionarAba = function(aba) {
    var tabForm = document.getElementById("tab-form");
    var tabList = document.getElementById("tab-list");
    var formView = document.getElementById("admin-form-view");
    var listView = document.getElementById("admin-list-view");

    if (aba === 'form') {
        tabForm.className = "admin-tab active";
        tabList.className = "admin-tab";
        formView.style.display = "block";
        listView.style.display = "none";
    } else {
        tabForm.className = "admin-tab";
        tabList.className = "admin-tab active";
        formView.style.display = "none";
        listView.style.display = "block";
    }
};

// 3. Inicializar formulário do Hero (agora que o HTML foi injetado)
var heroForm = document.getElementById("hero-form");
var inputTitle = document.getElementById("hero-title");
var inputSubtitle = document.getElementById("hero-subtitle");
var inputImage = document.getElementById("hero-image");
var imagePreview = document.getElementById("image-preview");

var base64Image = null; // Guardar imagem lida em Base64

// 4. Carregar configurações existentes se houver (agora lista de slides)
function carregarConfiguracoes() {
    renderizarSlidesAdmin();
}

// Função para renderizar a lista de slides cadastrados
function renderizarSlidesAdmin() {
    var heroSlides = getStorageData("heroConfig"); // mantendo o nome heroConfig para os slides, mas será um array
    if (!heroSlides || !Array.isArray(heroSlides)) {
        heroSlides = [];
    }

    var adminSlidesList = document.getElementById("admin-slides-list");
    
    if (heroSlides.length === 0) {
        adminSlidesList.innerHTML = "<p>Nenhum slide cadastrado.</p>";
        return;
    }

    var htmlList = "";
    for (var i = 0; i < heroSlides.length; i++) {
        var slide = heroSlides[i];
        htmlList += '<div class="admin-slide-card">' +
            '<img src="' + (slide.imagem || 'https://via.placeholder.com/100x100?text=Sem+Imagem') + '" alt="' + slide.titulo + '">' +
            '<div class="admin-slide-info">' +
                '<h3>' + slide.titulo + '</h3>' +
                '<p>' + slide.subtitulo + '</p>' +
            '</div>' +
            '<div class="admin-slide-actions">' +
                '<button onclick="window.abrirModalEdicaoSlide(' + slide.id + ')" class="btn-edit">Editar</button>' +
                '<button onclick="window.excluirSlideAdmin(' + slide.id + ')" class="btn-delete">Excluir</button>' +
            '</div>' +
        '</div>';
    }
    
    adminSlidesList.innerHTML = htmlList;
}

window.excluirSlideAdmin = function(id) {
    var heroSlides = getStorageData("heroConfig");
    if (!heroSlides || !Array.isArray(heroSlides)) return;
    
    if (confirm("Tem certeza que deseja excluir este slide?")) {
        for (var i = 0; i < heroSlides.length; i++) {
            if (heroSlides[i].id === id) {
                heroSlides.splice(i, 1);
                break;
            }
        }
        setStorageData("heroConfig", heroSlides);
        showToast("Slide excluído com sucesso!", 3000);
        renderizarSlidesAdmin();
    }
};

window.abrirModalEdicaoSlide = function(id) {
    var heroSlides = getStorageData("heroConfig");
    if (!heroSlides || !Array.isArray(heroSlides)) return;
    
    var slideAtual = null;
    for (var i = 0; i < heroSlides.length; i++) {
        if (heroSlides[i].id === id) {
            slideAtual = heroSlides[i];
            break;
        }
    }
    
    if (slideAtual) {
        var camposFormulario = [
            { name: "titulo", label: "Título", type: "text" },
            { name: "subtitulo", label: "Subtítulo", type: "text" }
        ];
        
        if (window.exibirModalUpdate) {
            window.exibirModalUpdate("Editar Slide", slideAtual, camposFormulario, function(dadosAtualizados) {
                // Ao salvar, atualizar o slide no array
                var heroSlidesAtuais = getStorageData("heroConfig");
                for (var j = 0; j < heroSlidesAtuais.length; j++) {
                    if (heroSlidesAtuais[j].id === id) {
                        heroSlidesAtuais[j].titulo = dadosAtualizados.titulo;
                        heroSlidesAtuais[j].subtitulo = dadosAtualizados.subtitulo;
                        break;
                    }
                }
                setStorageData("heroConfig", heroSlidesAtuais);
                showToast("Slide atualizado com sucesso!", 3000);
                renderizarSlidesAdmin();
            });
        }
    }
};

// 5. Configurar listener para o input de arquivo (Imagem)
inputImage.addEventListener("change", function(evento) {
    var file = evento.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            base64Image = e.target.result;
            imagePreview.innerHTML = '<img src="' + base64Image + '" alt="Preview do Banner">';
        };
        reader.readAsDataURL(file);
    }
});

// 6. Configurar evento de envio (submit) do formulário
heroForm.addEventListener("submit", function(evento) {
    evento.preventDefault();

    var tituloValor = inputTitle.value.trim();
    var subtituloValor = inputSubtitle.value.trim();

    if (!tituloValor || !subtituloValor) {
        showToast("Por favor, preencha o título e o subtítulo.", 3000, "error");
        return;
    }

    var heroSlides = getStorageData("heroConfig");
    if (!heroSlides || !Array.isArray(heroSlides)) {
        heroSlides = [];
    }

    if (heroSlides.length >= 3) {
        showToast("O limite máximo é de 3 slides.", 3000, "error");
        return;
    }

    var novoSlide = {
        id: new Date().getTime(),
        titulo: tituloValor,
        subtitulo: subtituloValor,
        imagem: base64Image
    };

    heroSlides.push(novoSlide);
    setStorageData("heroConfig", heroSlides);
    showToast("Slide adicionado com sucesso!", 3000);

    heroForm.reset();
    base64Image = null;
    imagePreview.innerHTML = "";
    renderizarSlidesAdmin();
});

// Chamar ao carregar a página
carregarConfiguracoes();
