/**
 * Componente Burro (Dumb Component).
 * Boa Prática (Arquitetura de Componentes): Este componente não possui lógicas de negócio.
 * Ele apenas recebe o array de produtos favoritos e retorna a marcação HTML para a tela.
 */
export function favoriteComponent(products) {

    if (!products.length) {
        return '<section class="empty-state">\n' +
               '    <h2>Nenhum favorito encontrado</h2>\n' +
               '    <p>\n' +
               '        Adicione produtos aos favoritos para vê-los aqui.\n' +
               '    </p>\n' +
               '</section>';
    }

    var htmlCards = "";
    
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        htmlCards += '<article class="favorite-card">\n' +
                     '    <img src="' + product.imagem + '" alt="' + product.nome + '">\n' +
                     '    <div class="favorite-info">\n' +
                     '        <h3>' + product.nome + '</h3>\n' +
                     '        <p>' + product.descricao + '</p>\n' +
                     '        <span>\n' +
                     '            R$ ' + Number(product.preco).toFixed(2) + '\n' +
                     '        </span>\n' +
                     '        <button class="remove-favorite-btn" data-id="' + product.id + '">\n' +
                     '            Remover\n' +
                     '        </button>\n' +
                     '    </div>\n' +
                     '</article>\n';
    }

    return '<section class="favorites-section">\n' +
           '    <h1>Meus Favoritos</h1>\n' +
           '    <div class="favorites-grid">\n' +
           '        ' + htmlCards + '\n' +
           '    </div>\n' +
           '</section>';
}
