import { getStorageData, setStorageData } from "../../../core/storage.js";

export function getHeroConfig() {
    var slides = getStorageData("heroConfig", []);
    if (!slides || !Array.isArray(slides)) return [];
    return slides;
}

/**
 * Salva a configuração de slides do banner.
 * Boa Prática (Tratamento de Erros): Protegemos a persistência com try/catch
 * para evitar que o site trave caso a memória local do dispositivo esteja cheia.
 */
function setHeroConfig(config) {
    try {
        setStorageData("heroConfig", config);
    } catch (erro) {
        console.error("Falha ao salvar a configuração do Banner:", erro);
    }
}

export function addHeroSlide(slide) {
    if (!slide.titulo || !slide.subtitulo) {
        throw new Error("Por favor, preencha o título e o subtítulo.");
    }

    var slides = getHeroConfig();

    if (slides.length >= 3) {
        throw new Error("O limite máximo é de 3 slides.");
    }

    slide.id = Date.now();
    slides.push(slide);
    setHeroConfig(slides);
}

export function updateHeroSlide(id, novosDados) {
    var slides = getHeroConfig();

    for (var i = 0; i < slides.length; i++) {
        if (slides[i].id == id) {
            if (novosDados.titulo !== undefined) slides[i].titulo = novosDados.titulo;
            if (novosDados.subtitulo !== undefined) slides[i].subtitulo = novosDados.subtitulo;
            if (novosDados.textoBotao !== undefined) slides[i].textoBotao = novosDados.textoBotao;
            if (novosDados.linkBotao !== undefined) slides[i].linkBotao = novosDados.linkBotao;
            break;
        }
    }

    setHeroConfig(slides);
}

export function deleteHeroSlide(id) {
    var slides = getHeroConfig();

    for (var i = 0; i < slides.length; i++) {
        if (slides[i].id == id) {
            slides.splice(i, 1);
            break;
        }
    }

    setHeroConfig(slides);
}
