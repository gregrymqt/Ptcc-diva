# Feature: About (Sobre Nós)

Esta pasta contém o módulo institucional "Sobre Nós" (About) da plataforma Diva Makeup. 
Sua responsabilidade principal é exibir a história e missão da marca, além de fornecer um formulário de contato para os clientes. Adicionalmente, esta feature fornece componentes reutilizáveis para que o painel administrativo (Admin) possa gerenciar as imagens desta página.

## Arquitetura e Componentes

A feature foi projetada utilizando **Componentização** e **Separação de Conceitos (SoC)**, dividindo responsabilidades entre:

- **`pages/`**: Contém a estrutura base em HTML (`about.html`).
- **`styles/`**: Arquivos de estilização local em CSS.
- **`components/`**: Funções que retornam blocos de interface (HTML em JavaScript).
  - `aboutComponent.js`: Renderiza a visualização do cliente (História e Contato).
  - `aboutAdminCardComponent.js`, `aboutFormComponent.js`, `aboutListComponent.js`: Fornecem as visualizações para o painel de administração da plataforma.
- **`services/`**: Camada que isola a lógica de negócio e persistência.
  - `aboutService.js`: Gerencia a leitura, criação, atualização e exclusão das imagens da página no `localStorage`, aplicando regras de negócio (ex: limite máximo de 1 imagem).
- **`about.js`**: Atua como o **Controller** da página. Orquestra a injeção dos componentes e adiciona comportamentos à DOM (ex: o `submit` do formulário de contato).

Essa divisão garante que as regras de persistência nunca se misturem à lógica visual, tornando o código altamente testável e manutenível.
