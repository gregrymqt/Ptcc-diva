# 📦 feature — Funcionalidades da Aplicação

A pasta `feature` contém todos os **domínios de negócio** da loja Diva. Cada subpasta é um módulo independente responsável por uma funcionalidade específica.

---

## Módulos

| Feature       | Descrição                                                            |
|---------------|----------------------------------------------------------------------|
| `auth/`       | Autenticação: login e cadastro de usuários                           |
| `cart/`       | Carrinho de compras: adicionar, remover e ajustar quantidade         |
| `categories/` | Categorias de produtos: listagem e criação (admin)                   |
| `checkout/`   | Finalização de compra: endereço de entrega e forma de pagamento      |
| `favorites/`  | Lista de favoritos: salvar e visualizar produtos favoritos           |
| `home/`       | Página inicial da loja                                               |
| `products/`   | Produtos: listagem, detalhe e cadastro (admin)                       |

---

## Estrutura Padrão de uma Feature

Cada feature segue a mesma estrutura interna de camadas:

```
feature/
└── nome-da-feature/
    ├── pages/       → Arquivo(s) HTML da feature
    ├── components/  → Funções que retornam HTML (renderização via JS)
    ├── models/      → Validação e regras de formato dos dados
    ├── services/    → Regras de negócio e acesso ao storage
    ├── styles/      → CSS específico desta feature
    └── [entry].js  → Ponto de entrada — orquestra tudo
```

### Responsabilidade de Cada Camada

| Camada        | Pergunta que responde                                   | Exemplo                                                  |
|---------------|---------------------------------------------------------|----------------------------------------------------------|
| `pages/`      | "Como a página HTML é estruturada?"                     | `login.html`, `cart.html`                                |
| `components/` | "Como a interface é renderizada?"                       | `LoginForm.js` injeta o formulário no DOM                |
| `models/`     | "Os dados estão no formato correto?"                    | `LoginModel.validate()` checa se o e-mail é válido       |
| `services/`   | "A lógica de negócio está satisfeita?"                  | `LoginService.authenticate()` verifica senha no storage  |
| `styles/`     | "Como essa feature se parece visualmente?"              | `cart.css` estiliza os itens do carrinho                 |
| `[entry].js`  | "Como tudo isso se conecta?"                            | `login.js` usa Model + Service + Component em sequência  |
