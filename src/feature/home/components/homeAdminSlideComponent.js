export function homeAdminSlideComponent(slide) {
    var imagem = slide.imagem || 'https://via.placeholder.com/100x100?text=Sem+Imagem';
    
    return '<div class="admin-slide-card">' +
        '<img src="' + imagem + '" alt="' + slide.titulo + '">' +
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

export function homeImagePreviewComponent(base64Image) {
    return '<img src="' + base64Image + '" alt="Preview do Banner">';
}
