# 🏠 feature/home — Página Inicial

Responsável pela **página principal (vitrine)** da loja Diva, que é a primeira coisa que o usuário vê ao acessar o site.

---

## Fluxo

```
index.html (raiz) → home.js
                        ├── [componentes de destaque / banner]
                        ├── navbarComponent  → exibe a navbar
                        └── footerComponent  → exibe o rodapé
```

---

## Arquivos

### Ponto de Entrada
| Arquivo   | O que faz                                                             |
|-----------|-----------------------------------------------------------------------|
| `home.js` | Inicializa a página home: renderiza a navbar, footer e conteúdos de destaque. |

### `components/`
Componentes visuais específicos da home (ex: banner, seção de destaques).

### `pages/`
Arquivo HTML da home.

### `styles/`
CSS específico da página inicial.
