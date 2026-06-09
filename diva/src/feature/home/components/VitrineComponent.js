import { getProductsWithCategory } from "../../products/services/productServices.js";

export async function VitrineComponent() {
  const products = await getProductsWithCategory();

  // Se não houver produtos, exibe uma mensagem elegante
  if (!products || products.length === 0) {
    return `<div class="vitrine-empty"><p>Nenhum produto encontrado no momento.</p></div>`;
  }

  // Gera o grid de produtos
  const productsHtml = products.map(product => {
    // Pegar a imagem da primeira variação para exibir na vitrine
    const mainImage = product.variacoes && product.variacoes.length > 0 
      ? product.variacoes[0].imagem 
      : 'https://via.placeholder.com/400x400?text=Sem+Imagem';

    const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco);

    return `
      <div class="vitrine-card">
        <div class="vitrine-image-container">
          <img src="${mainImage}" alt="${product.nome}" class="vitrine-image" loading="lazy" />
        </div>
        <div class="vitrine-info">
          <span class="vitrine-category">${product.categoryName}</span>
          <h3 class="vitrine-title">${product.nome}</h3>
          <p class="vitrine-price">${formattedPrice}</p>
          <a href="../products/pages/product-detail.html?id=${product.id}" class="btn-detalhes">Ver Detalhes</a>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="vitrine-section">
      <h2 class="section-title">Destaques Diva</h2>
      <div class="vitrine-grid">
        ${productsHtml}
      </div>
    </section>
  `;
}
