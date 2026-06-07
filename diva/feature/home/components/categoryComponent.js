export function categoryComponent() {

    const categories = [
        "Maquiagem",
        "Cuidados com a Pele",
        "Olhos",
        "Unhas"
    ];

    return `
        <section class="categories-section">

            <h2>Categorias</h2>

            <div class="categories-grid">

                ${categories.map(category => `
                    <div class="category-card">

                        <h3>${category}</h3>

                    </div>
                `).join("")}

            </div>

        </section>
    `;
}