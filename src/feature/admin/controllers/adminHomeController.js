import { getHeroConfig, addHeroSlide, updateHeroSlide, deleteHeroSlide } from "../../home/services/heroService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { homeFormComponent } from "../../home/components/homeFormComponent.js";
import { homeListComponent } from "../../home/components/homeListComponent.js";
import { homeAdminSlideComponent, homeImagePreviewComponent, homeEmptySlidesComponent } from "../../home/components/homeAdminSlideComponent.js";

/**
 * Carrega a lógica da tela de configuração da Home (Carousel/Hero).
 * Gerencia adição, edição e exclusão de slides exibidos na página inicial.
 */
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
    if (listContainer) {
        listContainer.addEventListener("click", function(event) {
            var elementoClicado = event.target;
            
            if (elementoClicado.classList.contains("btn-delete-slide")) {
                var idItem = elementoClicado.getAttribute("data-id");
                var heroSlides = getHeroConfig();
                if (!heroSlides || !Array.isArray(heroSlides)) heroSlides = [];
                
                var itemParaExcluir = null;
                for (var k = 0; k < heroSlides.length; k++) {
                    if (heroSlides[k].id == idItem) { itemParaExcluir = heroSlides[k]; break; }
                }
                
                if (window.exibirModalDelete) {
                    window.exibirModalDelete("Confirmar Exclusão", itemParaExcluir, "Tem certeza de que deseja remover este slide permanentemente?", function(objetoConfirmado) {
                        try {
                            deleteHeroSlide(objetoConfirmado.id);
                            showToast("Slide excluído com sucesso!", 3000);
                            renderizarSlidesAdmin();
                        } catch (erro) {
                            showToast(erro.message, 3000, "error");
                        }
                    });
                } else if (confirm("Tem certeza que deseja excluir este slide?")) {
                    try {
                        deleteHeroSlide(idItem);
                        showToast("Slide excluído com sucesso!", 3000);
                        renderizarSlidesAdmin();
                    } catch (erro) {
                        showToast(erro.message, 3000, "error");
                    }
                }
            }
            
            if (elementoClicado.classList.contains("btn-edit-slide")) {
                var idItemEdit = elementoClicado.getAttribute("data-id");
                var heroSlidesEdit = getHeroConfig();
                if (!heroSlidesEdit || !Array.isArray(heroSlidesEdit)) heroSlidesEdit = [];
                
                var itemParaEditar = null;
                for (var j = 0; j < heroSlidesEdit.length; j++) {
                    if (heroSlidesEdit[j].id == idItemEdit) { itemParaEditar = heroSlidesEdit[j]; break; }
                }
                
                var camposConfig = [
                    { name: "titulo", label: "Título", type: "text" },
                    { name: "subtitulo", label: "Subtítulo", type: "text" },
                    { name: "textoBotao", label: "Texto do Botão", type: "text" },
                    { name: "linkBotao", label: "Link do Botão", type: "text" }
                ];
                
                if (window.exibirModalUpdate) {
                    window.exibirModalUpdate("Editar Slide", itemParaEditar, camposConfig, function(objetoAtualizado) {
                        try {
                            updateHeroSlide(objetoAtualizado.id, objetoAtualizado);
                            showToast("Slide atualizado com sucesso!", 3000);
                            renderizarSlidesAdmin();
                        } catch (erro) {
                            showToast(erro.message, 3000, "error");
                        }
                    });
                }
            }
        });
    }

    carregarConfiguracoes();
}

/**
 * Acopla os listeners (eventos de submit e change) nos elementos do formulário Hero.
 */
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

        var novoSlide = {
            titulo: tituloValor,
            subtitulo: subtituloValor,
            textoBotao: botaoTextoValor,
            linkBotao: botaoLinkValor,
            imagem: base64Image
        };

        try {
            addHeroSlide(novoSlide);
            showToast("Slide adicionado com sucesso!", 3000);
            
            heroForm.reset();
            base64Image = null;
            imagePreview.innerHTML = "";
            renderizarSlidesAdmin();
        } catch (erro) {
            showToast(erro.message, 3000, "error");
        }
    });
}

function carregarConfiguracoes() {
    renderizarSlidesAdmin();
}

function renderizarSlidesAdmin() {
    var heroSlides = getHeroConfig();
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


