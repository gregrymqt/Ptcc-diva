# ❤️ feature/favorites — Produtos Favoritos

Responsável por permitir que o usuário **salve e visualize seus produtos favoritos**.

---

## Fluxo de Listagem

```
favorites.html → favorites.js
                      ├── favoriteService    → busca os produtos favoritados no storage
                      ├── favoriteComponent  → renderiza os cards dos produtos favoritos
                      ├── navbarComponent    → exibe a navbar
                      └── footerComponent    → exibe o rodapé
```

## Fluxo de Favoritar (nos cards de produto)

```
[Botão de coração em qualquer card de produto]
    → favoriteEvents.js (initFavoriteEvents)
          → favoriteService.toggleFavorite(id)
                → adiciona ou remove o ID do produto nos favoritos
```

---

## Arquivos

### Ponto de Entrada
| Arquivo          | O que faz                                                        |
|------------------|------------------------------------------------------------------|
| `favorites.js`   | Renderiza a página de favoritos com todos os produtos curtidos.  |
| `favoriteEvents.js` | Inicializa os event listeners dos botões de favorito em qualquer página que liste produtos. |

### `components/`
Contém `favoriteComponent.js` — função que recebe a lista de produtos favoritos e retorna o HTML dos cards.

### `models/`
Define a estrutura de dados relacionada a favoritos.

### `services/`
| Função                        | O que faz                                                    |
|-------------------------------|--------------------------------------------------------------|
| `getFavoriteProducts()`       | Retorna os dados completos dos produtos favoritados          |
| `toggleFavorite(productId)`   | Adiciona o produto aos favoritos (ou remove se já estiver)   |
| `isFavorite(productId)`       | Retorna `true` se o produto estiver na lista de favoritos    |

### `styles/`
CSS específico da tela de favoritos.

---

## Como `favoriteEvents.js` é Reutilizado

O arquivo `favoriteEvents.js` exporta `initFavoriteEvents()`, que é chamado em qualquer página que exibe botões de favorito (ex: `products.js`). Ele detecta os botões com a classe `.favorite-btn` e adiciona os listeners de clique automaticamente.

```js
// Em products.js ou qualquer outra feature que liste produtos:
import { initFavoriteEvents } from "../../favorites/favoriteEvents.js";
initFavoriteEvents(); // Ativa os botões de ❤️ em todos os cards
```

---

## Storage

Os favoritos são salvos na chave `favoritos` do localStorage como um array de IDs de produto: `["1", "3", "7"]`.
