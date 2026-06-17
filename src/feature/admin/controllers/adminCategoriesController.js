import { getCategories, createCategory, deleteCategory, updateCategory } from "../../categories/services/categoryService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { categoryAdminListComponent } from "../../categories/components/categoryAdminListComponent.js";
import { categoryFormComponent } from "../../categories/components/categoryFormComponent.js";

/**
 * Controller responsável pela tela de Gestão de Categorias no Painel.
 * Gerencia o DOM do form e lista, delegando chamadas aos Services.
 */
export function carregarModuloCategorias() {
    var formContainer = document.getElementById("admin-category-form-container");
    if (formContainer) {
        formContainer.innerHTML = categoryFormComponent();
    }

    var form = document.getElementById("category-form");
    
    // Configuração do Preview de Imagem
    var imgInput = document.getElementById("imagem");
    var imgPreviewContainer = document.getElementById("category-image-preview-container");
    var imgPreview = document.getElementById("category-image-preview");
    var base64CategoryImage = null;

    if (imgInput) {
        imgInput.addEventListener("change", function(e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(evt) {
                    base64CategoryImage = evt.target.result;
                    if (imgPreview && imgPreviewContainer) {
                        imgPreview.src = base64CategoryImage;
                        imgPreviewContainer.style.display = "block";
                    }
                };
                reader.readAsDataURL(file);
            } else {
                base64CategoryImage = null;
                if (imgPreviewContainer) imgPreviewContainer.style.display = "none";
            }
        });
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var nome = document.getElementById("nome").value.trim();
            var desc = document.getElementById("descricao").value.trim();

            if (!nome || !desc) {
                showToast("Preencha todos os campos obrigatórios.", 3000, "error");
                return;
            }

            try {
                var category = { 
                    id: new Date().getTime(), 
                    nome: nome, 
                    descricao: desc, 
                    imagem: base64CategoryImage || "" 
                };
                createCategory(category);
                showToast("Categoria cadastrada!", 3000);
                form.reset();
                
                // Limpar preview após salvar
                base64CategoryImage = null;
                if (imgPreviewContainer) imgPreviewContainer.style.display = "none";
                if (imgPreview) imgPreview.src = "";
                
                renderizarListaCategorias();
            } catch (erro) {
                showToast(erro.message, 3000, "error");
            }
        });
    }

    var listContainer = document.getElementById("admin-categories-list");
    if (listContainer) {
        listContainer.addEventListener("click", function (event) {
            var elementoClicado = event.target;

            if (elementoClicado.classList.contains("btn-delete-category")) {
                var idItem = elementoClicado.getAttribute("data-id");
                var categorias = getCategories();
                var itemParaExcluir = null;
                for (var k = 0; k < categorias.length; k++) {
                    if (categorias[k].id == idItem) { itemParaExcluir = categorias[k]; break; }
                }

                if (window.exibirModalDelete) {
                    window.exibirModalDelete("Confirmar Exclusão", itemParaExcluir, "Tem certeza de que deseja remover esta categoria permanentemente?", function (objetoConfirmado) {
                        deleteCategory(objetoConfirmado.id);
                        showToast("Categoria excluída!", 3000);
                        renderizarListaCategorias();
                    });
                } else if (confirm("Tem certeza que deseja excluir esta categoria?")) {
                    deleteCategory(idItem);
                    showToast("Categoria excluída!", 3000);
                    renderizarListaCategorias();
                }
            }

            if (elementoClicado.classList.contains("btn-edit-category")) {
                var idItemEdit = elementoClicado.getAttribute("data-id");
                var categoriasEdit = getCategories();
                var itemParaEditar = null;
                for (var j = 0; j < categoriasEdit.length; j++) {
                    if (categoriasEdit[j].id == idItemEdit) { itemParaEditar = categoriasEdit[j]; break; }
                }

                var camposConfig = [
                    { name: "nome", label: "Nome da Categoria", type: "text" },
                    { name: "descricao", label: "Descrição", type: "text" }
                ];

                if (window.exibirModalUpdate) {
                    window.exibirModalUpdate("Editar Categoria", itemParaEditar, camposConfig, function (objetoAtualizado) {
                        try {
                            updateCategory(objetoAtualizado.id, objetoAtualizado);
                            showToast("Categoria atualizada com sucesso!", 3000);
                            renderizarListaCategorias();
                        } catch (erro) {
                            showToast(erro.message, 3000, "error");
                        }
                    });
                }
            }
        });
    }

    renderizarListaCategorias();
}

function renderizarListaCategorias() {
    var categorias = getCategories();
    var listContainer = document.getElementById("admin-categories-list");
    if (!listContainer) return;

    listContainer.innerHTML = categoryAdminListComponent(categorias);
}


