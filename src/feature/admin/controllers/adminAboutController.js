/* ================================================
   ADMINABOUTCONTROLLER.JS — Controller de Imagens About
   ================================================ */

import { getAboutImagesConfig, setAboutImagesConfig } from "../../about/services/aboutService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { aboutAdminCardComponent, aboutImagePreviewComponent } from "../../about/components/aboutAdminCardComponent.js";

export function carregarModuloAbout() {
    inicializarLogicaAbout();
    var adminAboutList = document.getElementById("admin-about-list");
    if (adminAboutList) {
        adminAboutList.addEventListener("click", function(event) {
            var elementoClicado = event.target;
            
            if (elementoClicado.classList.contains("btn-delete-about")) {
                var idItem = elementoClicado.getAttribute("data-id");
                var aboutImages = getAboutImagesConfig();
                if (!aboutImages || !Array.isArray(aboutImages)) aboutImages = [];
                
                var itemParaExcluir = null;
                for (var k = 0; k < aboutImages.length; k++) {
                    if (aboutImages[k].id == idItem) { itemParaExcluir = aboutImages[k]; break; }
                }
                
                if (window.exibirModalDelete) {
                    window.exibirModalDelete("Confirmar Exclusão", itemParaExcluir, "Tem certeza de que deseja remover esta imagem permanentemente?", function(objetoConfirmado) {
                        for (var i = 0; i < aboutImages.length; i++) {
                            if (aboutImages[i].id == objetoConfirmado.id) {
                                aboutImages.splice(i, 1);
                                break;
                            }
                        }
                        setAboutImagesConfig(aboutImages);
                        showToast("Imagem excluída com sucesso!", 3000);
                        renderizarImagensAbout();
                    });
                } else if (confirm("Tem certeza que deseja excluir esta imagem?")) {
                    for (var i = 0; i < aboutImages.length; i++) {
                        if (aboutImages[i].id == idItem) {
                            aboutImages.splice(i, 1);
                            break;
                        }
                    }
                    setAboutImagesConfig(aboutImages);
                    showToast("Imagem excluída com sucesso!", 3000);
                    renderizarImagensAbout();
                }
            }
            
            if (elementoClicado.classList.contains("btn-edit-about")) {
                var idItemEdit = elementoClicado.getAttribute("data-id");
                var aboutImagesEdit = getAboutImagesConfig();
                if (!aboutImagesEdit || !Array.isArray(aboutImagesEdit)) aboutImagesEdit = [];
                
                var itemParaEditar = null;
                for (var j = 0; j < aboutImagesEdit.length; j++) {
                    if (aboutImagesEdit[j].id == idItemEdit) { itemParaEditar = aboutImagesEdit[j]; break; }
                }
                
                var camposConfig = [
                    { name: "alt", label: "Texto Alternativo (Alt)", type: "text" },
                    { name: "url", label: "URL da Imagem", type: "text" }
                ];
                
                if (window.exibirModalUpdate) {
                    window.exibirModalUpdate("Editar Imagem", itemParaEditar, camposConfig, function(objetoAtualizado) {
                        for (var m = 0; m < aboutImagesEdit.length; m++) {
                            if (aboutImagesEdit[m].id == objetoAtualizado.id) {
                                aboutImagesEdit[m].alt = objetoAtualizado.alt;
                                aboutImagesEdit[m].url = objetoAtualizado.url;
                                break;
                            }
                        }
                        setAboutImagesConfig(aboutImagesEdit);
                        showToast("Imagem atualizada com sucesso!", 3000);
                        renderizarImagensAbout();
                    });
                }
            }
        });
    }

    renderizarImagensAbout();
}

function inicializarLogicaAbout() {
    var aboutForm = document.getElementById("about-image-form");
    var inputImage = document.getElementById("about-image-upload");
    var inputAlt = document.getElementById("about-image-alt");
    var imagePreview = document.getElementById("about-image-preview");

    if (!aboutForm) return;

    var base64Image = null;

    inputImage.addEventListener("change", function(evento) {
        var file = evento.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                base64Image = e.target.result;
                imagePreview.innerHTML = aboutImagePreviewComponent(base64Image);
            };
            reader.readAsDataURL(file);
        }
    });

    aboutForm.addEventListener("submit", function(evento) {
        evento.preventDefault();

        var altValor = inputAlt.value.trim();

        if (!base64Image) {
            showToast("Por favor, selecione uma imagem.", 3000, "error");
            return;
        }

        var aboutImages = getAboutImagesConfig();
        if (!aboutImages || !Array.isArray(aboutImages)) {
            aboutImages = [];
        }

        if (aboutImages.length >= 1) {
            showToast("O limite máximo é de 1 imagem para o Sobre Nós. Exclua a imagem atual para adicionar uma nova.", 4000, "error");
            return;
        }

        var novaImagem = {
            id: new Date().getTime(),
            alt: altValor || "Imagem da seção Sobre Nós",
            url: base64Image
        };

        aboutImages.push(novaImagem);
        setAboutImagesConfig(aboutImages);
        showToast("Imagem adicionada com sucesso!", 3000);

        aboutForm.reset();
        base64Image = null;
        imagePreview.innerHTML = "";
        renderizarImagensAbout();
    });
}

function renderizarImagensAbout() {
    var aboutImages = getAboutImagesConfig();
    if (!aboutImages || !Array.isArray(aboutImages)) {
        aboutImages = [];
    }

    var adminAboutList = document.getElementById("admin-about-list");
    if (!adminAboutList) return;
    
    if (aboutImages.length === 0) {
        adminAboutList.innerHTML = "<p>Nenhuma imagem cadastrada na seção Sobre.</p>";
        return;
    }

    var htmlList = "";
    for (var i = 0; i < aboutImages.length; i++) {
        var img = aboutImages[i];
        htmlList += aboutAdminCardComponent(img);
    }
    
    adminAboutList.innerHTML = htmlList;
}


