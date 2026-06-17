export function productAdminListComponent(produtos) {
    if (!produtos || produtos.length === 0) {
        return '<div class="admin-section admin-list-wrapper"><div class="admin-empty-state" style="text-align: center; padding: 3rem 1rem; color: #777;"><p style="font-size: 1.1rem; font-weight: 500; margin: 0;">Nenhum produto cadastrado no momento.</p></div></div>';
    }
    
    var html = '<div class="admin-section admin-list-wrapper">' +
               '<table class="admin-table"><thead><tr><th>Imagem</th><th>Nome</th><th>Categoria</th><th>Preço</th><th>Ações</th></tr></thead><tbody>';
    for (var i = 0; i < produtos.length; i++) {
        var p = produtos[i];
        html += '<tr>' +
            '<td><img src="' + (p.imagem || 'https://via.placeholder.com/50') + '" width="50" height="50"></td>' +
            '<td>' + p.nome + '</td>' +
            '<td>' + (p.categoryName || 'Sem Categoria') + '</td>' +
            '<td>R$ ' + parseFloat(p.preco).toFixed(2).replace('.', ',') + '</td>' +
            '<td>' +
                '<button data-id="' + p.id + '" class="btn-edit btn-edit-product" style="margin-right: 8px;">Editar</button>' +
                '<button data-id="' + p.id + '" class="btn-delete btn-delete-product">Deletar</button>' +
            '</td>' +
        '</tr>';
    }
    html += '</tbody></table></div>';
    return html;
}
