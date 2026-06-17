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

## Componentes Administrativos

O módulo administrativo (`src/feature/admin`) consome os seguintes componentes desta pasta para construir as telas de edição de categoria:
- `categoryFormComponent.js`
- `categoryAdminListComponent.js`

---

## Arquivos

### Ponto de Entrada
| Arquivo               | O que faz                                                    |
|-----------------------|--------------------------------------------------------------|
| `categories.js`       | Renderiza a lista de todas as categorias na página pública.  |

### `components/`
Contém as funções geradoras de interface HTML isoladas:
- `categoryComponent.js`: HTML para os cards da vitrine pública.
- `categoryFormComponent.js`: HTML do formulário de criação/edição.
- `categoryAdminListComponent.js`: HTML da listagem gerencial.

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
