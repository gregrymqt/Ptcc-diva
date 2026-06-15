# 🧩 shared/components — Componentes Visuais Globais

Esta pasta contém os três componentes de interface que são compartilhados por toda a aplicação.

---

## `navbar/` — Barra de Navegação

| Arquivo               | Responsabilidade                                                                  |
|-----------------------|-----------------------------------------------------------------------------------|
| `navbarComponent.js`  | Retorna a string HTML da navbar. Renderiza os links e o ícone do carrinho.        |
| `navbarController.js` | Adiciona comportamento dinâmico à navbar (ex: contador de itens no carrinho).     |
| `navbar.css`          | Estilos visuais da navbar.                                                        |

**Como usar em uma feature:**
```js
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { initNavbar }       from "../../shared/components/navbar/navbarController.js";

document.getElementById("navbar").innerHTML = navbarComponent();
initNavbar(); // Ativa a lógica dinâmica (ex: badge do carrinho)
```

---

## `footer/` — Rodapé

| Arquivo              | Responsabilidade                           |
|----------------------|--------------------------------------------|
| `footerComponent.js` | Retorna a string HTML do rodapé da página. |
| `footer.css`         | Estilos visuais do rodapé.                 |

**Como usar em uma feature:**
```js
import { footerComponent } from "../../shared/components/footer/footerComponent.js";

document.getElementById("footer").innerHTML = footerComponent();
```

---

## `toast/` — Notificações (Toast)

Exibe uma mensagem de feedback temporária na tela (tipo "snackbar"). Desaparece automaticamente após alguns segundos.

| Arquivo             | Responsabilidade                                         |
|---------------------|----------------------------------------------------------|
| `toastComponent.js` | Função `showToast(mensagem, duração)` que cria e exibe o toast no DOM. |
| `toast.css`         | Estilos e animação de entrada/saída do toast.            |

**Como usar em qualquer lugar:**
```js
import { showToast } from "../../shared/components/toast/toastComponent.js";

showToast("Produto adicionado ao carrinho!"); // Duração padrão
showToast("Acesso negado!", 2500);           // Duração customizada em ms
```
