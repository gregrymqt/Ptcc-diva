import { getStorageData, setStorageData } from "../../../core/storage.js";

export function getAboutImagesConfig() {
    var images = getStorageData("aboutImagesConfig", []);
    if (!images || !Array.isArray(images)) return [];
    return images;
}

function setAboutImagesConfig(config) {
    setStorageData("aboutImagesConfig", config);
}

export function addAboutImage(alt, url) {
    var images = getAboutImagesConfig();
    
    if (images.length >= 1) {
        throw new Error("O limite máximo é de 1 imagem para o Sobre Nós. Exclua a imagem atual.");
    }

    if (!url) {
        throw new Error("Por favor, selecione uma imagem.");
    }

    var novaImagem = {
        id: new Date().getTime(),
        alt: alt || "Imagem da seção Sobre Nós",
        url: url
    };

    images.push(novaImagem);
    setAboutImagesConfig(images);
}

export function updateAboutImage(id, novosDados) {
    var images = getAboutImagesConfig();

    for (var i = 0; i < images.length; i++) {
        if (images[i].id == id) {
            if (novosDados.alt !== undefined) images[i].alt = novosDados.alt;
            if (novosDados.url !== undefined) images[i].url = novosDados.url;
            break;
        }
    }

    setAboutImagesConfig(images);
}

export function deleteAboutImage(id) {
    var images = getAboutImagesConfig();

    for (var i = 0; i < images.length; i++) {
        if (images[i].id == id) {
            images.splice(i, 1);
            break;
        }
    }

    setAboutImagesConfig(images);
}
