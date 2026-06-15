export function aboutAdminCardComponent(img) {
    return '<div class="admin-slide-card" style="display:flex; align-items:center; gap:15px; margin-bottom:15px; padding:15px; border:1px solid #ddd; border-radius:8px;">' +
        '<img src="' + img.url + '" alt="' + img.alt + '" style="width:100px; height:100px; object-fit:cover; border-radius:8px;">' +
        '<div class="admin-slide-info" style="flex:1;">' +
            '<h3>' + img.alt + '</h3>' +
        '</div>' +
        '<div class="admin-slide-actions">' +
            '<button data-id="' + img.id + '" class="btn-edit btn-edit-about" style="background-color:#3498db; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; margin-right:8px;">Editar</button>' +
            '<button data-id="' + img.id + '" class="btn-delete btn-delete-about" style="background-color:#e74c3c; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer;">Excluir</button>' +
        '</div>' +
    '</div>';
}

export function aboutImagePreviewComponent(base64Image) {
    return '<img src="' + base64Image + '" alt="Preview" style="max-width:200px; border-radius:8px; margin-top:10px;">';
}
