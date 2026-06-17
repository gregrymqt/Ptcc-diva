export function aboutAdminCardComponent(img) {
    return '<div class="admin-slide-card">' +
        '<img src="' + img.url + '" alt="' + img.alt + '">' +
        '<div class="admin-slide-info">' +
            '<h3>' + img.alt + '</h3>' +
        '</div>' +
        '<div class="admin-slide-actions">' +
            '<button data-id="' + img.id + '" class="btn-edit btn-edit-about">Editar</button>' +
            '<button data-id="' + img.id + '" class="btn-delete btn-delete-about">Excluir</button>' +
        '</div>' +
    '</div>';
}

export function aboutImagePreviewComponent(base64Image) {
    return '<img src="' + base64Image + '" alt="Preview">';
}

export function aboutEmptyImagesComponent() {
    return '<div class="admin-empty-state" style="text-align: center; padding: 3rem 1rem; color: #777;"><i class="fas fa-images" style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 1rem; display:block;"></i><p style="font-size: 1.1rem; font-weight: 500; margin: 0;">Nenhuma imagem cadastrada na seção Sobre.</p></div>';
}
