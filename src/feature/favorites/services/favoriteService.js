/* ================================================
   FAVORITESERVICE.JS — Serviço de Favoritos

   Responsável por gerenciar os produtos favoritos
   do usuário, salvando-os no localStorage.

   A chave usada é "favorites".
   ================================================ */

// Nome da chave onde os favoritos ficam salvos
var CHAVE_FAVORITOS = "favorites";


/* Retorna a lista de todos os favoritos salvos.
   Se não houver nenhum, retorna uma lista vazia. */
export function getFavorites() {
  var dados = localStorage.getItem(CHAVE_FAVORITOS);

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

/* Salva a lista completa de favoritos no localStorage.
   Função interna — usada pelas funções abaixo. */
function salvarFavoritos(favoritos) {
  localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
}

/* Adiciona um produto aos favoritos pelo seu ID.
   Cada favorito tem um ID próprio e guarda o ID do produto. */
export function createFavorite(productId) {
  var favoritos = getFavorites();

  // Cria um novo registro de favorito com ID e produto
  var novoFavorito = {
    id:        Date.now(),
    productId: productId
  };

  favoritos.push(novoFavorito);
  salvarFavoritos(favoritos);
}

/* Busca um favorito pelo seu próprio ID (não pelo ID do produto). */
export function findFavoriteById(id) {
  var favoritos = getFavorites();

  for (var i = 0; i < favoritos.length; i++) {
    if (favoritos[i].id === id) {
      return favoritos[i];
    }
  }

  return null;
}

/* Remove um favorito pelo seu próprio ID. */
export function deleteFavorite(id) {
  var favoritos   = getFavorites();
  var restantes   = [];

  for (var i = 0; i < favoritos.length; i++) {
    if (favoritos[i].id !== id) {
      restantes.push(favoritos[i]);
    }
  }

  salvarFavoritos(restantes);
}

/* Verifica se um produto já está nos favoritos.
   Retorna true (está) ou false (não está). */
export function isFavorite(productId) {
  var favoritos = getFavorites();

  for (var i = 0; i < favoritos.length; i++) {
    if (favoritos[i].productId === productId) {
      return true;
    }
  }

  return false;
}

/* Alterna o estado de favorito de um produto.
   Se já estiver nos favoritos, remove.
   Se não estiver, adiciona.
   Retorna true se adicionou, false se removeu. */
export function toggleFavorite(productId) {
  var favoritos = getFavorites();

  // Procura se o produto já está nos favoritos
  var indiceExistente = -1;

  for (var i = 0; i < favoritos.length; i++) {
    if (favoritos[i].productId === productId) {
      indiceExistente = i;
    }
  }

  if (indiceExistente !== -1) {
    // Produto encontrado → remove da lista
    var restantes = [];

    for (var j = 0; j < favoritos.length; j++) {
      if (favoritos[j].productId !== productId) {
        restantes.push(favoritos[j]);
      }
    }

    salvarFavoritos(restantes);
    return false; // Indica que o produto foi REMOVIDO

  } else {
    // Produto não encontrado → adiciona na lista
    var novoFavorito = {
      id:        Date.now(),
      productId: productId
    };

    favoritos.push(novoFavorito);
    salvarFavoritos(favoritos);
    return true; // Indica que o produto foi ADICIONADO
  }
}

/* Retorna a lista de produtos completos que estão nos favoritos.
   Une os dados dos favoritos com os dados dos produtos.
   Útil para exibir a página "Meus Favoritos". */
export function getFavoriteProducts() {
  var favoritos = getFavorites();

  // Lê os produtos diretamente do localStorage
  var dadosProdutos = localStorage.getItem("products");
  var produtos      = dadosProdutos ? JSON.parse(dadosProdutos) : [];

  var resultado = [];

  // Para cada favorito, busca o produto correspondente
  for (var i = 0; i < favoritos.length; i++) {
    var favorito = favoritos[i];

    for (var j = 0; j < produtos.length; j++) {
      if (produtos[j].id === favorito.productId) {
        resultado.push(produtos[j]);
      }
    }
  }

  return resultado;
}