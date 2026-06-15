/* ================================================
   ADMINABOUTCONTROLLER.JS — Controller de Imagens About
   ================================================ */

import { setStorageData, getStorageData } from "../../../core/storage.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { aboutAdminCardComponent, aboutImagePreviewComponent } from "../../about/components/aboutAdminCardComponent.js";

export function carregarModuloAbout() {
    inicializarLogicaAbout();
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

        var aboutImages = getStorageData("aboutImagesConfig");
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
        setStorageData("aboutImagesConfig", aboutImages);
        showToast("Imagem adicionada com sucesso!", 3000);

        aboutForm.reset();
        base64Image = null;
        imagePreview.innerHTML = "";
        renderizarImagensAbout();
    });
}

function renderizarImagensAbout() {
    var aboutImages = getStorageData("aboutImagesConfig");
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

window.excluirImagemAbout = function(id) {
    var aboutImages = getStorageData("aboutImagesConfig");
    if (!aboutImages || !Array.isArray(aboutImages)) return;
    
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
        for (var i = 0; i < aboutImages.length; i++) {
            if (aboutImages[i].id === id) {
                aboutImages.splice(i, 1);
                break;
            }
        }
        setStorageData("aboutImagesConfig", aboutImages);
        showToast("Imagem excluída com sucesso!", 3000);
        renderizarImagensAbout();
    }
};
