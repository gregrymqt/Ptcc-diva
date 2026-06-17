export function categoryAdminListComponent(categorias) {
    if (!categorias || categorias.length === 0) {
        return '<div class="admin-section admin-list-wrapper"><div class="admin-empty-state" style="text-align: center; padding: 3rem 1rem; color: #777;"><p style="font-size: 1.1rem; font-weight: 500; margin: 0;">Nenhuma categoria cadastrada no momento.</p></div></div>';
    }
    
    var html = '<div class="admin-section admin-list-wrapper">' +
               '<table class="admin-table"><thead><tr><th>Imagem</th><th>Nome</th><th>Ações</th></tr></thead><tbody>';
    for (var i = 0; i < categorias.length; i++) {
        var cat = categorias[i];
        html += '<tr>' +
            '<td><img src="' + (cat.imagem || 'https://via.placeholder.com/50') + '" width="50" height="50"></td>' +
            '<td>' + cat.nome + '</td>' +
            '<td>' +
                '<button data-id="' + cat.id + '" class="btn-edit btn-edit-category" style="margin-right: 8px;">Editar</button>' +
                '<button data-id="' + cat.id + '" class="btn-delete btn-delete-category">Deletar</button>' +
            '</td>' +
        '</tr>';
    }
    html += '</tbody></table></div>';
    return html;
}
