# ✨ shared — Componentes Compartilhados

A pasta `shared` contém **componentes visuais reutilizáveis** que são usados por múltiplas features da aplicação. Qualquer elemento de interface que aparece em mais de uma página mora aqui.

---

## Estrutura

```
shared/
└── components/
    ├── navbar/   → Barra de navegação superior
    ├── footer/   → Rodapé da página
    └── toast/    → Notificações temporárias (pop-up)
```

---

## Por que `shared` existe?

Sem essa pasta, cada feature teria que copiar e colar o código do navbar, footer e toast. Se fosse necessário alterar a navbar, precisaria alterar em 7 lugares diferentes. Com `shared`, a mudança é feita em **um único lugar** e reflete em toda a aplicação.
