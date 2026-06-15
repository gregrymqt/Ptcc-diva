/**
 * Componente de Modal Dinâmico para Atualização/Edição
 * 
 * Regras aplicadas:
 * 1. Proibido uso de Arrow Functions (=>)
 * 2. Proibido métodos modernos de array (.map, .filter, etc) - Uso exclusivo de 'for'/'while'
 * 3. Proibido desestruturação complexa
 * 4. Manipulação nativa do DOM
 */

/**
 * Exibe um modal dinâmico para edição de registros.
 * 
 * @param {string} titulo O título que aparecerá no cabeçalho do modal.
 * @param {Object} dadosObjeto Os dados atuais do item.
 * @param {Array} camposFormulario Configuração dos campos (ex: [{name: 'nome', label: 'Nome', type: 'text'}]).
 * @param {Function} callbackSalvar Função executada ao clicar em salvar, recebendo o objeto atualizado.
 */
function exibirModalUpdate(titulo, dadosObjeto, camposFormulario, callbackSalvar) {
    // 1. Criação do overlay (fundo escuro)
    var overlay = document.createElement('div');
    overlay.className = 'diva-modal-overlay';
    
    // Fechar ao clicar no overlay
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            fecharModal(overlay);
        }
    });

    // 2. Criação da caixa do modal
    var modalBox = document.createElement('div');
    modalBox.className = 'diva-modal-box';

    // 3. Cabeçalho do modal
    var header = document.createElement('div');
    header.className = 'diva-modal-header';

    var headerTitle = document.createElement('h2');
    headerTitle.className = 'diva-modal-title';
    headerTitle.textContent = titulo;

    var closeIcon = document.createElement('button');
    closeIcon.className = 'diva-modal-close-icon';
    closeIcon.innerHTML = '&times;';
    closeIcon.addEventListener('click', function() {
        fecharModal(overlay);
    });

    header.appendChild(headerTitle);
    header.appendChild(closeIcon);
    modalBox.appendChild(header);

    // 4. Corpo do modal (Formulário dinâmico)
    var body = document.createElement('div');
    body.className = 'diva-modal-body';

    // Array para guardar referência dos inputs e seus nomes para facilitar a coleta depois
    var inputsReferencia = [];

    // Laço de repetição tradicional (for) para criar os campos dinamicamente
    for (var i = 0; i < camposFormulario.length; i++) {
        var configCampo = camposFormulario[i];
        
        var fieldGroup = document.createElement('div');
        fieldGroup.className = 'diva-modal-field-group';

        var label = document.createElement('label');
        label.className = 'diva-modal-label';
        label.textContent = configCampo.label;

        var input = document.createElement('input');
        input.className = 'diva-modal-input';
        input.type = configCampo.type || 'text';
        input.name = configCampo.name;

        // Preenche o valor se existir em dadosObjeto
        if (dadosObjeto && dadosObjeto[configCampo.name] !== undefined) {
            input.value = dadosObjeto[configCampo.name];
        }

        fieldGroup.appendChild(label);
        fieldGroup.appendChild(input);
        body.appendChild(fieldGroup);

        // Guardando referência
        inputsReferencia.push({
            name: configCampo.name,
            element: input
        });
    }

    modalBox.appendChild(body);

    // 5. Rodapé do modal com botões
    var footer = document.createElement('div');
    footer.className = 'diva-modal-footer';

    var btnCancel = document.createElement('button');
    btnCancel.className = 'diva-modal-btn diva-modal-btn-cancel';
    btnCancel.textContent = 'Cancelar';
    btnCancel.addEventListener('click', function() {
        fecharModal(overlay);
    });

    var btnSave = document.createElement('button');
    btnSave.className = 'diva-modal-btn diva-modal-btn-save';
    btnSave.textContent = 'Salvar';
    btnSave.addEventListener('click', function() {
        var dadosAtualizados = {};

        // Laço tradicional para capturar os dados dos inputs
        for (var j = 0; j < inputsReferencia.length; j++) {
            var ref = inputsReferencia[j];
            dadosAtualizados[ref.name] = ref.element.value;
        }

        // Mesclando dados originais com atualizados via for..in (evitando spread {...})
        var objetoFinal = {};
        if (dadosObjeto) {
            for (var keyOriginal in dadosObjeto) {
                if (dadosObjeto.hasOwnProperty(keyOriginal)) {
                    objetoFinal[keyOriginal] = dadosObjeto[keyOriginal];
                }
            }
        }
        
        for (var keyAtualizada in dadosAtualizados) {
            if (dadosAtualizados.hasOwnProperty(keyAtualizada)) {
                objetoFinal[keyAtualizada] = dadosAtualizados[keyAtualizada];
            }
        }

        callbackSalvar(objetoFinal);
        fecharModal(overlay);
    });

    footer.appendChild(btnCancel);
    footer.appendChild(btnSave);
    modalBox.appendChild(footer);

    // Adiciona a caixa ao overlay e o overlay ao body
    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);
}

/**
 * Função utilitária para fechar o modal
 * @param {HTMLElement} modalElement Elemento do overlay a ser removido do DOM
 */
function fecharModal(modalElement) {
    if (modalElement && modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
    }
}

// Disponibiliza no objeto global window para uso como componente isolado
window.exibirModalUpdate = exibirModalUpdate;
