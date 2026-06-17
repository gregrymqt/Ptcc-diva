/* ================================================
   ADMINABOUTCONTROLLER.JS — Controller de Imagens About
   ================================================ */

import { getAboutImagesConfig, addAboutImage, updateAboutImage, deleteAboutImage } from "../../about/services/aboutService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { aboutAdminCardComponent, aboutImagePreviewComponent, aboutEmptyImagesComponent } from "../../about/components/aboutAdminCardComponent.js";

/**
 * Carrega a lógica da tela "Sobre" dentro do Admin.
 * Boa Prática (SoC): Isola todas as lógicas referentes ao "About" neste controller.
 */
export function carregarModuloAbout() {
    inicializarLogicaAbout();
    var adminAboutList = document.getElementById("admin-about-list");
    
    // Boa Prática (Event Delegation): Em vez de adicionar eventos de clique em cada botão individual (que podem ser dinâmicos),
    // colocamos o escutador no pai ("adminAboutList") e verificamos a classe do elemento filho (event.target).
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
                        // Boa Prática (Tratamento de Erros): Captura exceções para não "quebrar" a interface, exibindo erro em um Toast.
                        try {
                            deleteAboutImage(objetoConfirmado.id);
                            showToast("Imagem excluída com sucesso!", 3000);
                            renderizarImagensAbout();
                        } catch (erro) {
                            showToast(erro.message, 3000, "error");
                        }
                    });
                } else if (confirm("Tem certeza que deseja excluir esta imagem?")) {
                    try {
                        deleteAboutImage(idItem);
                        showToast("Imagem excluída com sucesso!", 3000);
                        renderizarImagensAbout();
                    } catch (erro) {
                        showToast(erro.message, 3000, "error");
                    }
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
                        try {
                            updateAboutImage(objetoAtualizado.id, objetoAtualizado);
                            showToast("Imagem atualizada com sucesso!", 3000);
                            renderizarImagensAbout();
                        } catch (erro) {
                            showToast(erro.message, 3000, "error");
                        }
                    });
                }
            }
        });
    }

    renderizarImagensAbout();
}

/**
 * Adiciona eventos ao formulário de "Sobre", como envio e preview da imagem (upload de arquivo).
 */
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

        try {
            addAboutImage(altValor, base64Image);
            showToast("Imagem adicionada com sucesso!", 3000);
            
            aboutForm.reset();
            base64Image = null;
            imagePreview.innerHTML = "";
            renderizarImagensAbout();
        } catch (erro) {
            showToast(erro.message, 4000, "error");
        }
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
        adminAboutList.innerHTML = aboutEmptyImagesComponent();
        return;
    }

    var htmlList = "";
    for (var i = 0; i < aboutImages.length; i++) {
        var img = aboutImages[i];
        htmlList += aboutAdminCardComponent(img);
    }
    
    adminAboutList.innerHTML = htmlList;
}


