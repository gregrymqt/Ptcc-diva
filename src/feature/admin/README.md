# 🛡️ Módulo Admin (Painel Administrativo)

Este diretório contém os arquivos responsáveis por compor a feature do **Painel de Administração** da loja Diva Makeup.

## 🎯 Responsabilidade Única
A responsabilidade desta feature é gerenciar a interface principal do administrador, funcionando como um contêiner (dashboard) para a renderização sob demanda dos demais submódulos do sistema (Home, Produtos, Categorias, Pedidos e Sobre).

Através do uso de Arquitetura baseada em Componentes e Separação de Conceitos (SoC), o arquivo base (`admin.js`) coordena a transição de abas e vistas, enquanto a lógica de negócio específica de cada entidade é delegada para os seus respectivos `controllers`.

## 📂 Estrutura de Diretórios e Arquivos

### `/components`
Componentes visuais reutilizáveis exclusivos da área administrativa.
- **`adminTabsComponent.js`**: Retorna a estrutura HTML das abas (Formulário/Consulta) para a manipulação dinâmica do DOM.

### `/controllers`
Responsáveis por gerenciar os eventos de interface e a comunicação com a camada de serviço (Services) de cada domínio específico.
- **`adminAboutController.js`**: Gerencia upload, edição e listagem de imagens da seção "Sobre Nós".
- **`adminCategoriesController.js`**: Controla o fluxo de cadastro e gerenciamento das categorias.
- **`adminHomeController.js`**: Manipula o carrossel (Hero) da Home Page.
- **`adminOrdersController.js`**: Renderiza a visualização da lista de pedidos dos clientes.
- **`adminProductsController.js`**: Cuida do fluxo de produtos, envolvendo manipulação de imagens em Base64 e integração com as categorias.

### `/pages`
- **`admin.html`**: O esqueleto (layout base) HTML do painel. Nele, reservamos contêineres vazios (`<aside>`, `<section>`) que serão posteriormente preenchidos via JavaScript, garantindo um HTML limpo.

### `/styles`
- **`admin.css`**: Arquivo mestre de estilos da página de administrador. Importa submódulos menores.
- **`/modules`**: Diretório que contém estilos específicos divididos por contexto (`adminCategories.css`, `adminOrders.css`, `adminProducts.css`), evitando um único arquivo CSS gigante.

### Arquivo Base
- **`admin.js`**: Ponto de entrada (Entry point) da tela administrativa. Ele invoca a proteção da rota (`protectAdminPage()`), injeta componentes compartilhados (Navbar/Footer/Sidebar) e serve como roteador local (SPA) para carregar os módulos das outras abas.
