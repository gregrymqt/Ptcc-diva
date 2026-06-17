/* ================================================
   ABOUTFORMCOMPONENT.JS — Formulário de Imagens About
   ================================================ */

export function aboutFormComponent() {
    return (
        '<div class="admin-section admin-form-wrapper">' +
        '<form id="about-image-form" class="admin-form">' +
            '<div class="form-group">' +
                '<label for="about-image-upload">Upload de Imagem</label>' +
                '<input type="file" id="about-image-upload" accept="image/*" required>' +
                '<div id="about-image-preview" class="image-preview"></div>' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="about-image-alt">Texto Alternativo (Alt)</label>' +
                '<input type="text" id="about-image-alt" required placeholder="Ex: Fachada da Loja Diva Makeup">' +
            '</div>' +
            '<button type="submit" class="btn-primary">Adicionar Imagem</button>' +
        '</form>' +
        '</div>'
    );
}
