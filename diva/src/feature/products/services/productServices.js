/* ================================================
   PRODUCTSERVICES.JS — Serviço de Produtos

   Responsável por ler, salvar e buscar os dados
   dos produtos no localStorage.

   Na primeira vez que a página carrega, este arquivo
   também pré-preenche o localStorage com produtos
   iniciais para a loja não aparecer vazia.
   ================================================ */

import { getCategories } from "../../categories/services/categoryService.js";

// Nome da chave onde os produtos ficam salvos no navegador
var CHAVE_PRODUTOS = "products";

/* Lista de produtos iniciais removida para transição aos dados dinâmicos.
   O array é mantido vazio para evitar erros de referência no sistema. */
var produtosIniciais = [];

/* Se o localStorage não tiver produtos ainda,
   preenche com os produtos iniciais automaticamente. */
function carregarProdutosIniciais() {
  if (!localStorage.getItem(CHAVE_PRODUTOS)) {
    localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtosIniciais));
  }
}

// Executa ao carregar o arquivo
carregarProdutosIniciais();


/* --------------------------------------------------
   FUNÇÕES DE LEITURA E ESCRITA DE PRODUTOS
   -------------------------------------------------- */

/* Retorna a lista completa de produtos do localStorage. */
export function getProducts() {
  var dados = localStorage.getItem(CHAVE_PRODUTOS);

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

/* Salva a lista completa de produtos no localStorage.
   Função interna — usada pelas funções abaixo. */
function salvarProdutos(produtos) {
  localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtos));
}

/* Cria e salva um novo produto no localStorage.
   Gera um ID único baseado no maior ID existente. */
export function createProduct(produto) {
  var produtos = getProducts();

  // Calcula o próximo ID disponível
  var maiorId = 0;

  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id > maiorId) {
      maiorId = produtos[i].id;
    }
  }

  // Adiciona o ID ao produto e salva
  produto.id = maiorId + 1;
  produtos.push(produto);
  salvarProdutos(produtos);

  return produto;
}

/* Busca e retorna um produto pelo seu ID.
   Aceita tanto números quanto texto (vem da URL como texto). */
export function findProductById(id) {
  var produtos = getProducts();

  for (var i = 0; i < produtos.length; i++) {
    // O == (sem ===) permite comparar "1" com 1 sem erro
    if (produtos[i].id == id) {
      return produtos[i];
    }
  }

  return null;
}

/* Atualiza os dados de um produto existente pelo ID. */
export function updateProduct(id, novosDados) {
  var produtos = getProducts();

  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id == id) {
      // Copia os dados antigos e sobrescreve com os novos
      for (var prop in novosDados) {
        produtos[i][prop] = novosDados[prop];
      }
    }
  }

  salvarProdutos(produtos);
}

/* Remove um produto da lista pelo ID. */
export function deleteProduct(id) {
  var produtos    = getProducts();
  var restantes   = [];

  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id != id) {
      restantes.push(produtos[i]);
    }
  }

  salvarProdutos(restantes);
}

/* Retorna todos os produtos com o NOME da categoria
   já incluído em cada produto.
   Útil para exibir "Batom — Lábios" nos cards. */
export function getProductsWithCategory() {
  var produtos    = getProducts();
  var categorias  = getCategories();
  var resultado   = [];

  for (var i = 0; i < produtos.length; i++) {
    var produto     = produtos[i];
    var nomeCateg   = "Sem Categoria";

    // Procura a categoria correspondente ao produto
    for (var j = 0; j < categorias.length; j++) {
      if (categorias[j].id == produto.categoryId) {
        nomeCateg = categorias[j].nome;
      }
    }

    // Cria um objeto novo com todos os dados do produto + o nome da categoria
    var produtoComCateg = {};

    for (var prop in produto) {
      produtoComCateg[prop] = produto[prop];
    }

    produtoComCateg.categoryName = nomeCateg;
    resultado.push(produtoComCateg);
  }

  return resultado;
}