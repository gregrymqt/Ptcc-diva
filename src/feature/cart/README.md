# 🛒 feature/cart — Carrinho de Compras

Responsável por gerenciar os **itens que o usuário adicionou ao carrinho** antes de finalizar a compra.

---

## Fluxo

```
cart.html → cart.js
                ├── cartComponent     → renderiza a lista de itens e o total
                ├── cartService       → lê, incrementa, decrementa e remove itens
                ├── navbarComponent   → exibe a navbar
                └── footerComponent   → exibe o rodapé
```

Quando o usuário clica em "+", "-" ou "Remover", o `cart.js` atualiza o storage via `cartService` e chama `render()` novamente para atualizar a interface.

---

## Arquivos

### Ponto de Entrada
| Arquivo    | O que faz                                                                  |
|------------|----------------------------------------------------------------------------|
| `cart.js`  | Renderiza a página do carrinho e gerencia os eventos de interação do usuário (aumentar, diminuir, remover). |

### `components/`
Contém `cartComponent.js` — função que recebe a lista de itens e retorna o HTML completo da tela do carrinho (itens, quantidades, preços e total).

### `models/`
Define a estrutura de dados de um item do carrinho.

### `services/`
| Função              | O que faz                                                  |
|---------------------|------------------------------------------------------------|
| `getCartProducts()` | Retorna todos os itens do carrinho do localStorage         |
| `addToCart(id)`     | Adiciona um produto ao carrinho (ou incrementa a quantidade) |
| `increaseQuantity(id)` | Aumenta em 1 a quantidade de um item                   |
| `decreaseQuantity(id)` | Diminui em 1 a quantidade (remove se chegar a 0)       |
| `removeCartItem(id)`| Remove completamente um item do carrinho                   |

### `styles/`
CSS específico da tela do carrinho.

---

## Storage

Os dados do carrinho são salvos no `localStorage` na chave `carrinho`, como uma lista de objetos `{ id, quantidade }`. O service junta essas informações com os dados completos dos produtos para exibir nome, preço e imagem.
