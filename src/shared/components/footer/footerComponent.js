/**
 * ================================================
 * FOOTERCOMPONENT.JS — Rodapé do Site
 *
 * Boa Prática de Componentização:
 * O Footer é isolado em uma função para ser facilmente importado 
 * e injetado em múltiplas telas, garantindo a consistência visual.
 * ================================================
 */

/**
 * Retorna o HTML completo do Footer.
 * @returns {string} HTML string com o layout do rodapé.
 */
export function footerComponent() {
  return (
    '<footer class="footer">' +
      '<div class="footer__container">' +

        '<div class="footer__brand">' +
          '<h2>Diva Makeup</h2>' +
          '<p>Beleza, autoestima e confiança para todos os momentos.</p>' +
        '</div>' +

        '<div class="footer__links">' +
          '<h3>Institucional</h3>' +
          '<a href="../../about/pages/about.html">Sobre</a>' +
          '<a href="../../about/pages/about.html#contato">Contato</a>' +
        '</div>' +

        '<div class="footer__copyright">' +
          '© 2026 Diva Makeup. Todos os direitos reservados.' +
        '</div>' +

      '</div>' +
    '</footer>'
  );
}