import { setStorageData, getStorageData } from "../../../core/storage.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";

export function carregarModuloHome() {
    inicializarLogicaHome();
    carregarConfiguracoes();
}

function inicializarLogicaHome() {
    var heroForm = document.getElementById("hero-form");
    var inputTitle = document.getElementById("hero-title");
    var inputSubtitle = document.getElementById("hero-subtitle");
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
                imagePreview.innerHTML = '<img src="' + base64Image + '" alt="Preview do Banner">';
            };
            reader.readAsDataURL(file);
        }
    });

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
