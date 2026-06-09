# 🔐 feature/auth — Autenticação

Responsável pelo **cadastro e login de usuários** na plataforma Diva.

---

## Fluxo de Login

```
login.html → login.js
                ├── LoginForm     → renderiza o formulário no DOM
                ├── LoginModel    → valida formato do e-mail e senha
                └── LoginService  → verifica credenciais no storage
                                    → cria sessão em localStorage
```

## Fluxo de Cadastro

```
register.html → register.js
                    ├── RegisterForm     → renderiza o formulário no DOM
                    ├── RegisterModel    → valida nome, e-mail, senha e confirmação
                    └── RegisterService  → verifica se e-mail já existe
                                          → salva novo usuário no storage
```

---

## Arquivos

### Ponto de Entrada
| Arquivo        | O que faz                                                         |
|----------------|-------------------------------------------------------------------|
| `login.js`     | Orquestra o fluxo de login: renderiza UI, valida, autentica, cria sessão e redireciona |
| `register.js`  | Orquestra o fluxo de cadastro: renderiza UI, valida, registra e redireciona para login |

### `pages/`
| Arquivo          | O que faz                                                |
|------------------|----------------------------------------------------------|
| `login.html`     | Página HTML de login. Carrega `login.js` como módulo.    |
| `register.html`  | Página HTML de cadastro. Carrega `register.js` como módulo. |

### `components/`
| Arquivo          | O que faz                                                        |
|------------------|------------------------------------------------------------------|
| `LoginForm.js`   | Classe que injeta o HTML do formulário de login no DOM e expõe métodos para ler valores e exibir erros. |
| `RegisterForm.js`| Classe que injeta o HTML do formulário de cadastro no DOM.       |

### `models/`
| Arquivo            | O que faz                                                      |
|--------------------|----------------------------------------------------------------|
| `LoginModel.js`    | Valida se o e-mail tem formato válido e se a senha não está vazia. |
| `RegisterModel.js` | Valida nome, e-mail, senha (mínimo de caracteres) e se confirmação bate com a senha. |

### `services/`
| Arquivo              | O que faz                                                    |
|----------------------|--------------------------------------------------------------|
| `LoginService.js`    | Busca o usuário no storage e verifica se a senha confere. Cria a sessão (`usuarioLogado`). |
| `RegisterService.js` | Verifica se o e-mail já está cadastrado. Se não, salva o novo usuário. |

### `styles/`
Contém os arquivos CSS específicos das telas de login e cadastro.

---

## Sessão de Usuário

Após o login bem-sucedido, o objeto do usuário é salvo em:
```
localStorage["usuarioLogado"] = { nome, email, role, ... }
```

Esse dado é usado pelo `core/rolesManager.js` para saber se o usuário logado é `admin` ou `user`.
