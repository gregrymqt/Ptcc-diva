import {
  getCategories
}
from "../../categories/services/categoryService.js";

const STORAGE_KEY = "products";

// Dados simulados iniciais para a loja "Diva Cosméticos"
const initialProducts = [
  {
    id: 1,
    nome: "Batom Matte Diva",
    descricao: "Batom líquido com acabamento super matte e longa duração. Não transfere e possui alta pigmentação.",
    preco: 49.90,
    categoryId: 1, // Assumindo ID de categoria genérico
    ingredientes: "Isododecane, Dimethicone, Trimethylsiloxysilicate, Silica, Polybutene, Macadamia Seed Oil.",
    modoUso: "Aplique uma camada uniforme sobre os lábios limpos e secos. Aguarde secar.",
    variacoes: [
      { cor: "Nude Elegance", hexadecimal: "#e0a899", imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop" },
      { cor: "Bordô Fatal", hexadecimal: "#801515", imagem: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop" }
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
      { cor: "Claro Frio", hexadecimal: "#fceadd", imagem: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=400&auto=format&fit=crop" },
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
      { cor: "Rosado", hexadecimal: "#e58a9e", imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop" }
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

// Inicialização da seed
function initSeed() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  }
}
initSeed();

// Simula um delay de rede para acostumar o sistema a uma API real
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/* PEGAR TODOS PRODUTOS */
export async function getProducts() {
  await delay();
  const products = localStorage.getItem(STORAGE_KEY);
  return products ? JSON.parse(products) : [];
}

/* SALVAR TODOS PRODUTOS (Uso interno na API mockada) */
async function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/* CRIAR PRODUTO */
export async function createProduct(product) {
  await delay();
  const products = await getProducts();
  
  // Garantir ID numérico único
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { ...product, id: newId };
  
  products.push(newProduct);
  await saveProducts(products);
  return newProduct;
}

/* BUSCAR PRODUTO POR ID */
export async function findProductById(id) {
  await delay();
  const products = await getProducts();
  // O id pode vir como string da URL
  return products.find(product => product.id == id);
}

/* ATUALIZAR PRODUTO */
export async function updateProduct(id, updatedData) {
  await delay();
  const products = await getProducts();
  const updatedProducts = products.map(product => {
    if (product.id == id) {
      return { ...product, ...updatedData };
    }
    return product;
  });
  await saveProducts(updatedProducts);
}

/* DELETAR PRODUTO */
export async function deleteProduct(id) {
  await delay();
  const products = await getProducts();
  const filteredProducts = products.filter(product => product.id != id);
  await saveProducts(filteredProducts);
}

/* PEGAR PRODUTOS COM CATEGORIA (Mapeamento relacional) */
export async function getProductsWithCategory() {
  const products = await getProducts();
  const categories = getCategories(); // getCategories permanece síncrono por ora, mas ideal é virar async no futuro

  return products.map(product => {
    const category = categories.find(c => c.id == product.categoryId);
    return {
      ...product,
      categoryName: category?.nome || "Sem Categoria"
    };
  });
}