export function favoriteComponent(products) {

    if (!products.length) {

        return `
            <section class="empty-state">

                <h2>Nenhum favorito encontrado</h2>

                <p>
                    Adicione produtos aos favoritos para vê-los aqui.
                </p>

            </section>
        `;
    }

    return `
        <section class="favorites-section">

            <h1>Meus Favoritos</h1>

            <div class="favorites-grid">

                ${products.map(product => `
                    <article class="favorite-card">

                        <img
                            src="${product.imagem}"
                            alt="${product.nome}"
                        >

                        <div class="favorite-info">

                            <h3>${product.nome}</h3>

                            <p>${product.descricao}</p>

                            <span>
                                R$ ${Number(product.preco).toFixed(2)}
                            </span>

                            <button
                                class="remove-favorite-btn"
                                data-id="${product.id}"
                            >
                                Remover
                            </button>

                        </div>

                    </article>
                `).join("")}

            </div>

        </section>
    `;
}
