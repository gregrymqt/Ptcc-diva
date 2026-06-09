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

/* Lista de produtos iniciais da loja Diva.
   São carregados automaticamente se o localStorage
   estiver vazio (primeira visita do usuário). */
var produtosIniciais = [
  {
    id: 1,
    nome: "Batom Matte Diva",
    descricao: "Batom líquido com acabamento super matte e longa duração. Não transfere e possui alta pigmentação.",
    preco: 49.90,
    categoryId: 1,
    ingredientes: "Isododecane, Dimethicone, Trimethylsiloxysilicate, Silica, Polybutene, Macadamia Seed Oil.",
    modoUso: "Aplique uma camada uniforme sobre os lábios limpos e secos. Aguarde secar.",
    variacoes: [
      { cor: "Nude Elegance", hexadecimal: "#e0a899", imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop" },
      { cor: "Bordô Fatal",   hexadecimal: "#801515", imagem: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: 2,
    nome: "Base Líquida Glow Pro",
    descricao: "Base de cobertura média a alta com efeito luminoso e natural. Contém ácido hialurônico.",
    preco: 89.90,
    categoryId: 2,
    ingredientes: "Water, Cyclopentasiloxane, Titanium Dioxide, Glycerin, Hyaluronic Acid, Niacinamide.",
    modoUso: "Com um pincel ou esponja, espalhe do centro do rosto para as extremidades.",
    variacoes: [
      { cor: "Claro Frio",   hexadecimal: "#fceadd", imagem: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=400&auto=format&fit=crop" },
      { cor: "Médio Quente", hexadecimal: "#d4a373", imagem: "https://images.unsplash.com/photo-1631214499929-1662921e1022?q=80&w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: 3,
    nome: "Blush Cremoso Cheek Tint",
    descricao: "Blush em creme fácil de esfumar, proporcionando um ar saudável e natural.",
    preco: 55.00,
    categoryId: 3,
    ingredientes: "Caprylic/Capric Triglyceride, Mica, Jojoba Oil, Carnauba Wax.",
    modoUso: "Aplique com os dedos nas maçãs do rosto dando leves batidinhas.",
    variacoes: [
      { cor: "Pêssego", hexadecimal: "#ffbfa8", imagem: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop" },
      { cor: "Rosado",  hexadecimal: "#e58a9e", imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: 4,
    nome: "Paleta de Sombras Midnight",
    descricao: "Paleta com 9 cores super pigmentadas entre tons opacos e cintilantes.",
    preco: 129.90,
    categoryId: 4,
    ingredientes: "Talc, Mica, Magnesium Stearate, Dimethicone, Iron Oxides.",
    modoUso: "Utilize pincéis de esfumar e depositar para criar o look desejado.",
    variacoes: [
      { cor: "Única", hexadecimal: "#3b3b3b", imagem: "https://images.unsplash.com/photo-1512496015851-a1cbfc3356bc?q=80&w=400&auto=format&fit=crop" }
    ]
  }
];

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