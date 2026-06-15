# 📁 src — Código Fonte da Aplicação

Esta pasta contém **todo o código JavaScript, HTML e CSS** da aplicação Diva. Ela é dividida em três grandes camadas:

| Pasta      | Responsabilidade                                                    |
|------------|---------------------------------------------------------------------|
| `core/`    | Módulos fundamentais da aplicação (storage e controle de acesso)    |
| `feature/` | Cada funcionalidade da loja em seu próprio módulo isolado           |
| `shared/`  | Componentes visuais reutilizados em múltiplas features              |

---

## Princípio de Organização

A arquitetura segue o padrão **Feature-Based (por funcionalidade)**: cada feature é tratada como um mini-módulo com suas próprias camadas de UI, lógica e dados. Isso evita que arquivos de features diferentes se misturem e facilita a manutenção e leitura do código.

```
src/
├── core/          → Infraestrutura: acesso a dados e segurança
├── feature/       → Domínios da aplicação (auth, cart, products...)
└── shared/        → UI compartilhada (navbar, footer, toast)
```
