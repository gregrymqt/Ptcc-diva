/* ================================================
   FOOTERCOMPONENT.JS — Rodapé do Site

   Constrói o HTML do rodapé que aparece no
   final de todas as páginas da loja.
   ================================================ */

/* Retorna o HTML completo do Footer. */
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
          '<a href="#">Sobre</a>' +
          '<a href="#">Contato</a>' +
        '</div>' +

        '<div class="footer__copyright">' +
          '© 2026 Diva Makeup. Todos os direitos reservados.' +
        '</div>' +

      '</div>' +
    '</footer>'
  );
}