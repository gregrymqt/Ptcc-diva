export function homeAdminSlideComponent(slide) {
    var imagem = slide.imagem || 'https://via.placeholder.com/100x100?text=Sem+Imagem';
    
    return '<div class="admin-slide-card">' +
        '<img src="' + imagem + '" alt="' + slide.titulo + '">' +
        '<div class="admin-slide-info">' +
            '<h3>' + slide.titulo + '</h3>' +
            '<p>' + slide.subtitulo + '</p>' +
        '</div>' +
        '<div class="admin-slide-actions">' +
            '<button data-id="' + slide.id + '" class="btn-edit btn-edit-slide">Editar</button>' +
            '<button data-id="' + slide.id + '" class="btn-delete btn-delete-slide">Excluir</button>' +
        '</div>' +
    '</div>';
}

export function homeImagePreviewComponent(base64Image) {
    return '<img src="' + base64Image + '" alt="Preview do Banner">';
}

export function homeEmptySlidesComponent() {
    return '<p>Nenhum slide cadastrado.</p>';
}
