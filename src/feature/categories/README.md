# 🏷️ feature/categories — Categorias de Produtos

Responsável pela **exibição e criação de categorias** que organizam os produtos da loja.

---

## Fluxo de Listagem

```
categories.html → categories.js
                      ├── categoryService    → busca todas as categorias no storage
                      ├── categoryComponent  → renderiza os cards de categoria
                      ├── navbarComponent    → exibe a navbar
                      └── footerComponent    → exibe o rodapé
```

## Fluxo de Criação (Admin)

```
create-category.html → create-category.js
                            ├── protectAdminPage  → bloqueia acesso se não for admin
                            └── [formulário de criação de categoria]
```

---

## Arquivos

### Ponto de Entrada
| Arquivo               | O que faz                                                    |
|-----------------------|--------------------------------------------------------------|
| `categories.js`       | Renderiza a lista de todas as categorias na página pública.  |
| `create-category.js`  | Formulário de criação de categoria. Restrito a admins.       |

### `components/`
Contém `categoryComponent.js` — função que recebe a lista de categorias e retorna o HTML dos cards de categoria.

### `models/`
Define a estrutura de dados de uma categoria.

### `services/`
| Função              | O que faz                                              |
|---------------------|--------------------------------------------------------|
| `getCategories()`   | Retorna todas as categorias do localStorage            |
| `createCategory()`  | Salva uma nova categoria no localStorage               |

### `styles/`
CSS específico das telas de categorias.

---

## Storage

As categorias são salvas na chave `categorias` do localStorage. Os produtos referenciam uma categoria pelo seu `id`, permitindo filtros e exibição do nome da categoria junto ao produto.
