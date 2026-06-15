export function adminTabsComponent() {
    return (
        '<div class="admin-tabs">' +
            '<button id="tab-form" class="admin-tab active" onclick="window.selecionarAba(\'form\')">Formulário</button>' +
            '<button id="tab-list" class="admin-tab" onclick="window.selecionarAba(\'list\')">Consulta</button>' +
        '</div>'
    );
}
