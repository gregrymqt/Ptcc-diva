/**
 * Componente de Modal Dinâmico para Operações CRUD (Update e Delete)
 * Regras: Estrito ES5, uso exclusivo de var, funções tradicionais e manipulação nativa do DOM.
 */

function fecharModal(modalElement) {
    if (modalElement && modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
    }
}

/**
 * Engine Base para Construção de Modais Administrativos
 */
function criarModalBase(tipo, titulo, dadosObjeto, conteudoCorpo, callbackConfirmar) {
    // 1. Criação do overlay (fundo escuro)
    var overlay = document.createElement('div');
    overlay.className = 'diva-modal-overlay';
    
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

    // 4. Corpo do modal (Mensagem ou Formulário Dinâmico)
    var body = document.createElement('div');
    body.className = 'diva-modal-body';

    var inputsReferencia = [];

    if (tipo === 'delete') {
        // Se for exclusão, renderiza apenas o texto de confirmação
        var txtMensagem = document.createElement('p');
        txtMensagem.className = 'diva-modal-text';
        txtMensagem.textContent = conteudoCorpo;
        body.appendChild(txtMensagem);
    } else {
        // Se for update, monta os campos dinamicamente por loop tradicional
        for (var i = 0; i < conteudoCorpo.length; i++) {
            var configCampo = conteudoCorpo[i];
            
            var fieldGroup = document.createElement('div');
            fieldGroup.className = 'diva-modal-field-group';

            var label = document.createElement('label');
            label.className = 'diva-modal-label';
            label.textContent = configCampo.label;

            var input = document.createElement('input');
            input.className = 'diva-modal-input';
            input.type = configCampo.type || 'text';
            input.name = configCampo.name;

            if (dadosObjeto && dadosObjeto[configCampo.name] !== undefined) {
                input.value = dadosObjeto[configCampo.name];
            }

            fieldGroup.appendChild(label);
            fieldGroup.appendChild(input);
            body.appendChild(fieldGroup);

            inputsReferencia.push({
                name: configCampo.name,
                element: input
            });
        }
    }

    modalBox.appendChild(body);

    // 5. Rodapé do modal com botões operacionais
    var footer = document.createElement('div');
    footer.className = 'diva-modal-footer';

    var btnCancel = document.createElement('button');
    btnCancel.className = 'diva-modal-btn diva-modal-btn-cancel';
    btnCancel.textContent = 'Cancelar';
    btnCancel.addEventListener('click', function() {
        fecharModal(overlay);
    });

    var btnAction = document.createElement('button');
    if (tipo === 'delete') {
        btnAction.className = 'diva-modal-btn diva-modal-btn-delete';
        btnAction.textContent = 'Excluir';
    } else {
        btnAction.className = 'diva-modal-btn diva-modal-btn-save';
        btnAction.textContent = 'Salvar';
    }

    btnAction.addEventListener('click', function() {
        if (tipo === 'delete') {
            // No delete, repassa o objeto original/ID para o callback executar a exclusão
            callbackConfirmar(dadosObjeto);
            fecharModal(overlay);
        } else {
            // No update, processa a coleta dos campos alterados
            var dadosAtualizados = {};
            for (var j = 0; j < inputsReferencia.length; j++) {
                var ref = inputsReferencia[j];
                dadosAtualizados[ref.name] = ref.element.value;
            }

            // Mesclagem segura usando for..in tradicional (Sem spreads)
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

            callbackConfirmar(objetoFinal);
            fecharModal(overlay);
        }
    });

    footer.appendChild(btnCancel);
    footer.appendChild(btnAction);
    modalBox.appendChild(footer);

    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);
}

/**
 * API Pública exposta no objeto global Window
 */
function exibirModalUpdate(titulo, dadosObjeto, camposFormulario, callbackSalvar) {
    criarModalBase('update', titulo, dadosObjeto, camposFormulario, callbackSalvar);
}

function exibirModalDelete(titulo, dadosObjeto, mensagemConfirmacao, callbackExcluir) {
    criarModalBase('delete', titulo, dadosObjeto, mensagemConfirmacao, callbackExcluir);
}

window.exibirModalUpdate = exibirModalUpdate;
window.exibirModalDelete = exibirModalDelete;
