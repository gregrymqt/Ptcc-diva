import { getProducts }
from "../../products/services/productService.js";

export function featuredProductsComponent() {

    const products = getProducts();

    const featuredProducts = products.slice(0, 4);

    if(featuredProducts.length === 0){

        return `
            <section class="featured-products">

                <h2>Nossos Queridinhos</h2>

                <p>
                    Nenhum produto cadastrado.
                </p>

            </section>
        `;
    }

    return `
        <section class="featured-products">

            <h2>Nossos Queridinhos</h2>

            <div class="products-grid">

                ${featuredProducts.map(product => `

                    <div class="product-card">

                        <img
                            src="${product.imagem}"
                            alt="${product.nome}"
                        >

                        <h3>${product.nome}</h3>

                        <p>${product.descricao}</p>

                        <span>
                            R$ ${product.preco}
                        </span>

                    </div>

                `).join("")}

            </div>

        </section>
    `;
}