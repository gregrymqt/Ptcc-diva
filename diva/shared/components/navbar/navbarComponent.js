export function navbarComponent() {
    return `
        <header class="navbar">

            <div class="navbar__container">

                <a href="../../home/pages/home.html" class="navbar__logo">
                    Diva Makeup
                </a>

                <button
                    class="navbar__toggle"
                    id="menuToggle"
                    aria-label="Abrir Menu"
                >
                    ☰
                </button>

                <nav class="navbar__menu" id="navbarMenu">

                    <a href="../../home/pages/home.html">
                        Home
                    </a>

                    <a href="../../products/pages/products.html">
                        Produtos
                    </a>

                    <a href="#">
                        Categorias
                    </a>

                    <a href="#">
                        Favoritos
                    </a>

                    <a href="#" class="navbar__button">
                        Carrinho
                    </a>

                </nav>

            </div>

        </header>
    `;
}
