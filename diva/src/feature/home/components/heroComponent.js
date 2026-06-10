import { getStorageData } from "../../../core/storage.js";

export function heroComponent() {
    var heroConfig = getStorageData('heroConfig');
    var titulo = "Desperte a <span>diva</span> que vive em você";
    var subtitulo = "Produtos premium de maquiagem para realçar sua beleza.";
    var imagem = "../../../assets/images/banner-1.png";

    if (heroConfig) {
        if (heroConfig.titulo) {
            titulo = heroConfig.titulo;
        }
        if (heroConfig.subtitulo) {
            subtitulo = heroConfig.subtitulo;
        }
        if (heroConfig.imagem) {
            imagem = heroConfig.imagem;
        }
    }

    return `
        <section class="hero">

            <div class="hero-content">

                <h1>
                    ${titulo}
                </h1>

                <p>
                    ${subtitulo}
                </p>

                <div class="hero-buttons">

                    <a href="../../products/pages/products.html"
                       class="btn-primary">
                        Comprar Agora
                    </a>

                    <a href="#"
                       class="btn-secondary">
                        Conheça a Marca
                    </a>

                </div>

            </div>

            <div class="hero-image">

                <div class="carousel">

                    <img
                        src="${imagem}"
                        alt="Produtos Diva Makeup"
                    >

                </div>

            </div>

        </section>
    `;
}