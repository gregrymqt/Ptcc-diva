/* ================================================
   ABOUTCOMPONENT.JS — Componente da Página Sobre
   ================================================ */

import { getAboutImagesConfig } from "../services/aboutService.js";

export function aboutComponent() {
  var aboutImages = getAboutImagesConfig();
  var htmlImages = "";

  if (aboutImages && Array.isArray(aboutImages) && aboutImages.length > 0) {
    for (var i = 0; i < aboutImages.length; i++) {
      var img = aboutImages[i];
      htmlImages += '<img src="' + img.url + '" alt="' + img.alt + '" style="margin-bottom: 1rem;">';
    }
  } else {
    htmlImages = '<img src="../../../../assets/images/about-marca.jpg" alt="Diva Makeup - Nossa História" onerror="this.src=\'https://via.placeholder.com/600x400?text=Diva+Makeup\'">';
  }

  return (
    '<section id="sobre-marca" class="about-section">' +
      '<div class="about-container">' +
        '<div class="about-image">' +
          htmlImages +
        '</div>' +
        '<div class="about-text">' +
          '<h2>Nossa História</h2>' +
          '<p>' +
            'A Diva Makeup nasceu com um propósito claro: elevar a autoestima e celebrar a beleza única de cada indivíduo. ' +
            'Acreditamos que a maquiagem não é apenas sobre esconder imperfeições, mas sobre realçar o que há de melhor em você.' +
          '</p>' +
          '<p>' +
            'Nossa missão é fornecer produtos de altíssima qualidade, cruelty-free e desenvolvidos com paixão, para que você ' +
            'sinta a confiança de ser a verdadeira Diva da sua própria vida. Nossos valores são pautados no respeito, diversidade e amor-próprio.' +
          '</p>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section id="contato" class="contact-section">' +
      '<div class="contact-container">' +
        '<h2>Fale Conosco</h2>' +
        '<p>Tem alguma dúvida, sugestão ou elogio? Envie uma mensagem e retornaremos em breve.</p>' +
        '<form id="form-contato" class="contact-form">' +
          '<div class="form-group">' +
            '<label for="nome">Nome Completo</label>' +
            '<input type="text" id="nome" name="nome" required placeholder="Digite seu nome">' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="email">E-mail</label>' +
            '<input type="email" id="email" name="email" required placeholder="Digite seu e-mail">' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="assunto">Assunto</label>' +
            '<input type="text" id="assunto" name="assunto" required placeholder="Qual o assunto?">' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="mensagem">Mensagem</label>' +
            '<textarea id="mensagem" name="mensagem" rows="5" required placeholder="Escreva sua mensagem..."></textarea>' +
          '</div>' +
          '<button type="submit" class="btn-submit">Enviar Mensagem</button>' +
        '</form>' +
      '</div>' +
    '</section>'
  );
}
