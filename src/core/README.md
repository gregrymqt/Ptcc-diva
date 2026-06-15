# 🧱 core — Módulos Centrais da Aplicação

A pasta `core` contém os **módulos de infraestrutura** que sustentam toda a aplicação. São utilitários de baixo nível que qualquer feature pode importar.

---

## Arquivos

### `storage.js` — Camada de Persistência de Dados

Abstrai todas as operações de leitura e escrita no `localStorage` do navegador. Funciona como o "banco de dados" da aplicação.

**Por que existe?**
Em vez de cada feature chamar `localStorage.getItem()` e `localStorage.setItem()` diretamente, todas as operações passam por este módulo, que padroniza o comportamento (parse/stringify automático, tratamento de erros) e simula um delay de rede de 200ms para que o código se comporte de forma mais realista (async/await).

**Funções exportadas:**

| Função                             | O que faz                                             |
|------------------------------------|-------------------------------------------------------|
| `getStorageData(key, defaultValue)` | Lê e faz parse de um dado do localStorage            |
| `setStorageData(key, data)`        | Serializa e salva um dado no localStorage             |
| `getUsers()`                       | Retorna a lista completa de usuários                  |
| `createUser(user)`                 | Adiciona um novo usuário à lista                      |
| `findUserByEmail(email)`           | Busca um usuário específico pelo e-mail               |
| `updateUser(email, updatedData)`   | Atualiza os dados de um usuário existente             |
| `deleteUser(email)`                | Remove um usuário pelo e-mail                         |

---

### `rolesManager.js` — Controle de Permissões (Roles)

Gerencia o sistema de papéis (roles) dos usuários: `admin` e `user`. É responsável por **proteger páginas que só o administrador pode acessar**.

**Roles disponíveis:**

- `user` — Usuário comum (padrão)
- `admin` — Administrador com acesso ao painel de cadastro de produtos e pedidos

**Funções exportadas:**

| Função                      | O que faz                                                                    |
|-----------------------------|------------------------------------------------------------------------------|
| `setUserRole(email, role)`  | Atribui uma role a um usuário                                                |
| `getUserRole(email)`        | Retorna a role atual do usuário (padrão: `'user'`)                           |
| `protectAdminPage()`        | Guarda de rota — redireciona para a home se o usuário não for admin          |

**Como funciona o guard (`protectAdminPage`)?**

1. Lê a sessão salva em `localStorage` (`usuarioLogado`).
2. Extrai o e-mail do usuário logado.
3. Busca a role dele via `getUserRole`.
4. Se não for `admin`, exibe um toast de "Acesso Negado" e redireciona para `index.html`.

**Uso típico** (colocar no topo de uma página de admin):

```js
import { protectAdminPage } from "../../core/rolesManager.js";
protectAdminPage();
```
