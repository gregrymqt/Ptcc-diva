import { getProducts } from "../../products/services/productServices.js";

export function featuredProductsComponent() {
    var products = getProducts();
    var featuredProducts = products.slice(0, 4);

    if (featuredProducts.length === 0) {
        return '<section class="featured-products">' +
            '<h2>Nossos Queridinhos</h2>' +
            '<p>Nenhum produto cadastrado.</p>' +
        '</section>';
    }

    var htmlGrid = "";
    for (var i = 0; i < featuredProducts.length; i++) {
        var product = featuredProducts[i];
        htmlGrid += '<div class="product-card">' +
            '<img src="' + product.imagem + '" alt="' + product.nome + '">' +
            '<h3>' + product.nome + '</h3>' +
            '<p>' + product.descricao + '</p>' +
            '<span>R$ ' + parseFloat(product.preco).toFixed(2).replace('.', ',') + '</span>' +
        '</div>';
    }

    return '<section class="featured-products">' +
        '<h2>Nossos Queridinhos</h2>' +
        '<div class="products-grid">' +
            htmlGrid +
        '</div>' +
    '</section>';
}