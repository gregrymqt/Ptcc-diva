# ✨ shared — Componentes Compartilhados

A pasta `shared` contém **componentes visuais reutilizáveis** e globais que são usados por múltiplas features da aplicação. Qualquer elemento de interface que aparece em mais de uma página ou estilos globais moram aqui.

---

## Estrutura Atual

```text
shared/
├── components/
│   ├── footer/   → Rodapé da página
│   ├── modal/    → Modais dinâmicos para CRUD
│   ├── navbar/   → Barra de navegação superior e lógica de menu
│   ├── sidebar/  → Menu lateral (Mobile-First)
│   └── toast/    → Notificações temporárias flutuantes (pop-up)
└── styles/
    └── global.css → Estilos globais (variáveis, resets e layout base)
```

---

## Por que `shared` existe?

Sem essa pasta, cada feature teria que copiar e colar o código do navbar, footer e toast. Se fosse necessário alterar a navbar, precisaria alterar em 7 lugares diferentes. Com `shared`, a mudança é feita em **um único lugar** e reflete em toda a aplicação. Isso segue o princípio **DRY (Don't Repeat Yourself)** e facilita a manutenção.
