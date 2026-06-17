# 🛍️ Diva — E-commerce de Moda

Projeto desenvolvido como PTCC (Projeto Técnico de Conclusão de Curso). Uma aplicação web de e-commerce focada em moda, construída com **HTML, CSS e JavaScript puro**, sem nenhum framework ou biblioteca externa.

---

## 📁 Estrutura do Projeto

```
Ptcc-diva/
└── diva/
    └── src/
        ├── core/          → Módulos centrais reutilizáveis (storage, permissões)
        ├── feature/       → Funcionalidades da aplicação (auth, cart, products...)
        └── shared/        → Componentes visuais compartilhados (navbar, footer, toast)
```

---

## 🚀 Funcionalidades Principais

| Feature       | Descrição                                              |
|---------------|--------------------------------------------------------|
| `about`       | Página institucional, missão e contato                 |
| `admin`       | Painel administrativo e dashboard do sistema           |
| `auth`        | Login e cadastro de usuários                           |
| `products`    | Listagem, detalhe e cadastro de produtos (admin)       |
| `categories`  | Listagem e criação de categorias                       |
| `cart`        | Carrinho de compras com controle de quantidade         |
| `checkout`    | Finalização de pedido com endereço e pagamento         |
| `favorites`   | Lista de produtos favoritos do usuário                 |
| `home`        | Página inicial da loja                                 |

---

## 🏗️ Arquitetura

O projeto adota uma arquitetura **Feature-Based** (por funcionalidade), onde cada feature é um módulo independente contendo suas próprias camadas:

- **`pages/`** — Arquivos HTML da feature
- **`components/`** — Componentes de interface (renderização via JS)
- **`models/`** — Validação e regras de formato de dados
- **`services/`** — Regras de negócio e acesso ao storage
- **`styles/`** — CSS específico da feature

---

## 💾 Persistência de Dados

A aplicação **não usa backend**. Todos os dados são persistidos de forma robusta e síncrona no `localStorage` do navegador, com parse automático de objetos, cujo fluxo é gerenciado estritamente pelo módulo `core/storage.js`.

**Chaves do localStorage utilizadas:**
| Chave            | Conteúdo                          |
|------------------|-----------------------------------|
| `usuarios`       | Lista de todos os usuários        |
| `usuarioLogado`  | Sessão do usuário atual           |
| `produtos`       | Lista de produtos                 |
| `categorias`     | Lista de categorias               |
| `carrinho`       | Itens do carrinho                 |
| `favoritos`      | IDs dos produtos favoritos        |
| `pedidos`        | Histórico de pedidos realizados   |

---

## 🔐 Sistema de Permissões (Roles)

Existem dois tipos de usuário:

- **`user`** — Usuário comum. Pode navegar, favoritar, adicionar ao carrinho e finalizar compras.
- **`admin`** — Administrador. Além das funções do user, pode cadastrar produtos, criar categorias e visualizar pedidos.

Páginas protegidas verificam a role via `core/rolesManager.js` antes de renderizar o conteúdo.

---

## ▶️ Como Executar

Por ser uma aplicação de arquivos estáticos com módulos ES6, ela precisa ser servida por um servidor HTTP (não pode ser aberta diretamente como arquivo pelo navegador).

**Opção recomendada — VS Code Live Server:**
1. Instale a extensão **Live Server** no VS Code.
2. Clique com o botão direito no `index.html` da raiz.
3. Selecione **"Open with Live Server"**.

**Opção via terminal (Node.js):**
```bash
npx serve .
```

---

## 🧑‍💻 Tecnologias Utilizadas

- **HTML5** — Estrutura das páginas
- **CSS3** — Estilização (vanilla, sem frameworks)
- **JavaScript ES6+** — Lógica da aplicação (módulos, async/await, classes)
- **localStorage** — Persistência de dados no cliente
