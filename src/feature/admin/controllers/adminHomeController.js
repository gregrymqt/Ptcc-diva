import { setStorageData, getStorageData } from "../../../core/storage.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { homeFormComponent } from "../../home/components/homeFormComponent.js";
import { homeListComponent } from "../../home/components/homeListComponent.js";
import { homeAdminSlideComponent, homeImagePreviewComponent, homeEmptySlidesComponent } from "../../home/components/homeAdminSlideComponent.js";

export function carregarModuloHome() {
    var formContainer = document.getElementById("admin-home-form-container");
    var listContainer = document.getElementById("admin-home-list-container");
    
    if (formContainer) {
        formContainer.innerHTML = homeFormComponent();
    }
    
    if (listContainer) {
        listContainer.innerHTML = homeListComponent();
    }

    inicializarLogicaHome();
    carregarConfiguracoes();
}

function inicializarLogicaHome() {
    var heroForm = document.getElementById("hero-form");
    var inputTitle = document.getElementById("hero-title");
    var inputSubtitle = document.getElementById("hero-subtitle");
    var inputButtonText = document.getElementById("hero-button-text");
    var inputButtonLink = document.getElementById("hero-button-link");
    var inputImage = document.getElementById("hero-image");
    var imagePreview = document.getElementById("image-preview");

    if (!heroForm) return;

    var base64Image = null;

    inputImage.addEventListener("change", function(evento) {
        var file = evento.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                base64Image = e.target.result;
                imagePreview.innerHTML = homeImagePreviewComponent(base64Image);
            };
            reader.readAsDataURL(file);
        }
    });

    heroForm.addEventListener("submit", function(evento) {
        evento.preventDefault();

        var tituloValor = inputTitle.value.trim();
        var subtituloValor = inputSubtitle.value.trim();
        var botaoTextoValor = inputButtonText ? inputButtonText.value.trim() : "";
        var botaoLinkValor = inputButtonLink ? inputButtonLink.value.trim() : "";

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
            id: Date.now(),
            titulo: tituloValor,
            subtitulo: subtituloValor,
            textoBotao: botaoTextoValor,
            linkBotao: botaoLinkValor,
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
}

function carregarConfiguracoes() {
    renderizarSlidesAdmin();
}

function renderizarSlidesAdmin() {
    var heroSlides = getStorageData("heroConfig");
    if (!heroSlides || !Array.isArray(heroSlides)) {
        heroSlides = [];
    }

    var adminSlidesList = document.getElementById("admin-slides-list");
    if (!adminSlidesList) return;
    
    if (heroSlides.length === 0) {
        adminSlidesList.innerHTML = homeEmptySlidesComponent();
        return;
    }

    var htmlList = "";
    for (var i = 0; i < heroSlides.length; i++) {
        var slide = heroSlides[i];
        htmlList += homeAdminSlideComponent(slide);
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
            { name: "subtitulo", label: "Subtítulo", type: "text" },
            { name: "textoBotao", label: "Texto do Botão", type: "text" },
            { name: "linkBotao", label: "Link do Botão", type: "text" }
        ];
        
        if (window.exibirModalUpdate) {
            window.exibirModalUpdate("Editar Slide", slideAtual, camposFormulario, function(dadosAtualizados) {
                var heroSlidesAtuais = getStorageData("heroConfig");
                for (var j = 0; j < heroSlidesAtuais.length; j++) {
                    if (heroSlidesAtuais[j].id === id) {
                        heroSlidesAtuais[j].titulo = dadosAtualizados.titulo;
                        heroSlidesAtuais[j].subtitulo = dadosAtualizados.subtitulo;
                        heroSlidesAtuais[j].textoBotao = dadosAtualizados.textoBotao;
                        heroSlidesAtuais[j].linkBotao = dadosAtualizados.linkBotao;
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
