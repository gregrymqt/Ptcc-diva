import { findProductById } from "../services/productServices.js";

export async function PdpComponent() {
  // Pegar ID da URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    return `<div class="pdp-error"><h2>Produto não encontrado.</h2><a href="../../home/pages/home.html" class="btn-voltar">Voltar para a Vitrine</a></div>`;
  }

  const product = await findProductById(id);

  if (!product) {
    return `<div class="pdp-error"><h2>Produto não encontrado.</h2><a href="../../home/pages/home.html" class="btn-voltar">Voltar para a Vitrine</a></div>`;
  }

  const hasVariations = product.variacoes && product.variacoes.length > 0;
  const initialImage = hasVariations ? product.variacoes[0].imagem : 'https://via.placeholder.com/600x600?text=Sem+Imagem';
  const initialColorName = hasVariations ? product.variacoes[0].cor : 'Única';
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco);

  // HTML dos Swatches
  let swatchesHtml = '';
  if (hasVariations) {
    swatchesHtml = product.variacoes.map((v, index) => {
      // O primeiro item ganha a classe active
      const isActive = index === 0 ? 'active' : '';
      return `
        <button 
          class="swatch ${isActive}" 
          style="background-color: ${v.hexadecimal};" 
          data-image="${v.imagem}" 
          data-colorname="${v.cor}"
          aria-label="Cor: ${v.cor}">
        </button>
      `;
    }).join('');
  }

  return `
    <section class="pdp-section">
      <div class="pdp-container">
        
        <!-- Galeria de Imagens -->
        <div class="pdp-gallery">
          <img id="pdp-main-image" src="${initialImage}" alt="${product.nome}" class="pdp-image" loading="eager" />
        </div>

        <!-- Informações do Produto -->
        <div class="pdp-details">
          <span class="pdp-category">${product.categoryName || 'Produto'}</span>
          <h1 class="pdp-title">${product.nome}</h1>
          <p class="pdp-price">${formattedPrice}</p>

          <div class="pdp-description-box">
            <p>${product.descricao}</p>
          </div>

          <!-- Seleção de Cores -->
          <div class="pdp-variations">
            <h3 class="variation-label">Cor selecionada: <span id="pdp-selected-color">${initialColorName}</span></h3>
            <div class="swatch-container">
              ${swatchesHtml}
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="pdp-actions">
            <button class="btn-add-cart" id="btn-add-cart">Adicionar à Sacola</button>
            <button class="btn-wishlist" aria-label="Adicionar aos favoritos">❤</button>
          </div>

          <!-- Abas de Informação Adicional -->
          <div class="pdp-accordion">
            <details class="accordion-item" open>
              <summary class="accordion-header">Modo de Uso</summary>
              <div class="accordion-body">
                <p>${product.modoUso || 'Consulte a embalagem do produto.'}</p>
              </div>
            </details>
            <details class="accordion-item">
              <summary class="accordion-header">Ingredientes</summary>
              <div class="accordion-body">
                <p>${product.ingredientes || 'Não informado.'}</p>
              </div>
            </details>
          </div>

        </div>
      </div>
    </section>
  `;
}
