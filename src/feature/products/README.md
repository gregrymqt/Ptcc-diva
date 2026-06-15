# 👗 feature/products — Produtos

Responsável por toda a **gestão de produtos** da loja: listagem pública, página de detalhes e painel de administração para cadastro e gerenciamento de pedidos.

---

## Fluxos

### 1. Listagem Pública de Produtos (Usuário)
```
products.html → products.js
                    ├── getProductsWithCategory()  → busca produtos com nome de categoria
                    ├── renderProducts()           → injeta os cards no DOM
                    ├── initFavoriteEvents()       → ativa botões de ❤️ (favoritar)
                    └── [.add-to-cart-btn]         → chama addToCart() ao clicar
```

### 2. Detalhes do Produto
```
product-detail.html → product-detail.js
                            ├── lê o ?id= da URL
                            ├── busca o produto no storage
                            └── renderiza informações completas + botão de compra
```

### 3. Painel Admin — Cadastro de Produto e Pedidos
```
create-product.html → create-product.js
                            ├── protectAdminPage()   → bloqueia não-admins
                            ├── initProductForm()    → formulário de criação de produto
                            └── [Aba de Pedidos]
                                    → AdminOrdersComponent() → lista todos os pedidos realizados
```

---

## Arquivos

### Ponto de Entrada
| Arquivo               | O que faz                                                         |
|-----------------------|-------------------------------------------------------------------|
| `products.js`         | Renderiza a listagem pública de produtos com filtro de categoria. |
| `product-detail.js`   | Renderiza a página de detalhes de um produto específico.          |
| `create-product.js`   | Painel admin com formulário de cadastro de produto e lista de pedidos. |

### `components/`
| Arquivo                     | O que faz                                                    |
|-----------------------------|--------------------------------------------------------------|
| `productComponent.js`       | Função que gera os cards de produto (imagem, nome, preço, botões). |
| `productFormComponent.js`   | Formulário de cadastro/edição de produto para o admin.       |
| `AdminOrdersComponent.js`   | Componente async que busca e renderiza a lista de todos os pedidos. |

### `models/`
Define a estrutura de dados de um produto.

### `services/`
| Função                         | O que faz                                                  |
|--------------------------------|------------------------------------------------------------|
| `getProducts()`                | Retorna todos os produtos do localStorage                  |
| `getProductsWithCategory()`    | Retorna produtos com o nome da categoria resolvido         |
| `getProductById(id)`           | Retorna um produto específico                              |
| `createProduct(product)`       | Salva um novo produto no localStorage                      |

### `styles/`
CSS específico das telas de produtos.

---

## Painel Admin

A página `create-product` tem um sistema de **abas (tabs)**:
- **Aba "Produtos"** — Exibe o formulário para cadastrar um novo produto.
- **Aba "Pedidos"** — Carrega e exibe todos os pedidos realizados por todos os usuários.

O acesso é protegido por `protectAdminPage()` do `core/rolesManager.js`. Usuários sem a role `admin` são redirecionados automaticamente.

---

## Como Adicionar ao Carrinho a Partir da Listagem

O `products.js` usa o serviço de `cart` para adicionar produtos:
```js
import { addToCart } from "../../cart/services/cartService.js";

document.querySelectorAll(".add-to-cart-btn").forEach(button => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.id); // dataset.id é o ID do produto no card
    showToast("Produto adicionado ao carrinho!");
  });
});
```
