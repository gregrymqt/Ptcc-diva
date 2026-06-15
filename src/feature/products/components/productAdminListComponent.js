export function productAdminListComponent(produtos) {
    if (!produtos || produtos.length === 0) {
        return "<p style='color:#666;'>Nenhum produto cadastrado.</p>";
    }
    
    var html = '<table class="admin-table"><thead><tr><th>Imagem</th><th>Nome</th><th>Categoria</th><th>Preço</th><th>Ações</th></tr></thead><tbody>';
    for (var i = 0; i < produtos.length; i++) {
        var p = produtos[i];
        html += '<tr>' +
            '<td><img src="' + (p.imagem || 'https://via.placeholder.com/50') + '" width="50" height="50"></td>' +
            '<td>' + p.nome + '</td>' +
            '<td>' + (p.categoryName || 'Sem Categoria') + '</td>' +
            '<td>R$ ' + parseFloat(p.preco).toFixed(2).replace('.', ',') + '</td>' +
            '<td>' +
                '<button onclick="window.excluirProdutoAdmin(' + p.id + ')" class="btn-delete">Deletar</button>' +
            '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';
    return html;
}
