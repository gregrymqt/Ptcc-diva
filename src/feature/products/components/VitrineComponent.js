/**
 * Componente Burro (Dumb Component) da Vitrine.
 * Boa Prática: Não busca dados sozinhos; recebe "products" via parâmetro.
 */
export function VitrineComponent(products) {

    if (!products || products.length === 0) {
        return '<div class="vitrine-empty"><p>Nenhum produto encontrado no momento.</p></div>';
    }

    var productsHtml = "";
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var mainImage = product.variacoes && product.variacoes.length > 0 
            ? product.variacoes[0].imagem 
            : (product.imagem || 'https://via.placeholder.com/400x400?text=Sem+Imagem');
        
        var precoFormatado = "R$ " + parseFloat(product.preco).toFixed(2).replace('.', ',');

        productsHtml += '<div class="vitrine-card">' +
            '<div class="vitrine-image-container">' +
                '<img src="' + mainImage + '" alt="' + product.nome + '" class="vitrine-image" loading="lazy" />' +
            '</div>' +
            '<div class="vitrine-info">' +
                '<span class="vitrine-category">' + product.categoryName + '</span>' +
                '<h3 class="vitrine-title">' + product.nome + '</h3>' +
                '<p class="vitrine-price">' + precoFormatado + '</p>' +
                '<a href="../../products/pages/product-detail.html?id=' + product.id + '" class="btn-detalhes">Ver Detalhes</a>' +
            '</div>' +
        '</div>';
    }

    return '<section class="vitrine-section">' +
        '<h2 class="section-title">Destaques Diva</h2>' +
        '<div class="vitrine-grid">' +
            productsHtml +
        '</div>' +
    '</section>';
}
