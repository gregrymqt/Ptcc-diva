/* ================================================
   TOASTCOMPONENT.JS — Alertas na Tela

   Este arquivo é responsável por mostrar aquelas
   mensagens rápidas na tela (ex: "Produto salvo!").
   Isso é conhecido como "Toast" (torrada), pois
   "pula" na tela como uma torrada numa torradeira.
   ================================================ */

/* Cria e exibe uma mensagem na tela.
   A mensagem some automaticamente após o tempo
   definido (padrão: 3 segundos). */
export function showToast(mensagem, duracao) {
  // Se não passarem a duração, define 3000 milissegundos (3 segundos)
  if (!duracao) {
    duracao = 3000;
  }

  // Verifica se já existe um aviso na tela
  var avisoAntigo = document.querySelector(".toast");

  // Se existir, remove o antigo para não encavalar
  if (avisoAntigo) {
    avisoAntigo.remove();
  }

  // Cria um novo elemento div para o aviso
  var aviso = document.createElement("div");

  // Coloca a classe CSS que dá a aparência de toast
  aviso.className = "toast";

  // Coloca o texto da mensagem dentro da div
  aviso.textContent = mensagem;

  // Adiciona a div no final do corpo da página (body)
  document.body.appendChild(aviso);

  // Espera uma fração de segundo e adiciona a classe "show"
  // para fazer a animação de entrada (surgir na tela)
  setTimeout(function() {
    aviso.classList.add("show");
  }, 100);

  // Define um timer para esconder o aviso depois da duração
  setTimeout(function() {
    // Remove a classe "show" (faz a animação de saída)
    aviso.classList.remove("show");

    // Espera a animação de saída terminar (0.3s) e remove a div do HTML
    setTimeout(function() {
      aviso.remove();
    }, 300);

  }, duracao);
}