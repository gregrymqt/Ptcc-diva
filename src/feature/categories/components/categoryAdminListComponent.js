export function categoryAdminListComponent(categorias) {
    if (!categorias || categorias.length === 0) {
        return "<p style='color:#666;'>Nenhuma categoria cadastrada.</p>";
    }
    
    var html = '<table class="admin-table"><thead><tr><th>Imagem</th><th>Nome</th><th>Ações</th></tr></thead><tbody>';
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
    html += '</tbody></table>';
    return html;
}
