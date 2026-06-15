import { getCategories, createCategory, deleteCategory, updateCategory } from "../../categories/services/categoryService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { categoryAdminListComponent } from "../../categories/components/categoryAdminListComponent.js";
import { categoryFormComponent } from "../../categories/components/categoryFormComponent.js";

export function carregarModuloCategorias() {
    var formContainer = document.getElementById("admin-category-form-container");
    if (formContainer) {
        formContainer.innerHTML = categoryFormComponent();
    }

    var form = document.getElementById("category-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var nome = document.getElementById("nome").value.trim();
            var desc = document.getElementById("descricao").value.trim();

            if (!nome || !desc) {
                showToast("Preencha todos os campos obrigatórios.", 3000, "error");
                return;
            }

            var imgInput = document.getElementById("imagem");
            var file = imgInput && imgInput.files && imgInput.files[0];

            if (file) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var category = { id: new Date().getTime(), nome: nome, descricao: desc, imagem: evt.target.result };
                    createCategory(category);
                    showToast("Categoria cadastrada!", 3000);
                    form.reset();
                    renderizarListaCategorias();
                };
                reader.readAsDataURL(file);
            } else {
                var category = { id: new Date().getTime(), nome: nome, descricao: desc, imagem: "" };
                createCategory(category);
                showToast("Categoria cadastrada!", 3000);
                form.reset();
                renderizarListaCategorias();
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
                        updateCategory(objetoAtualizado.id, objetoAtualizado);
                        showToast("Categoria atualizada com sucesso!", 3000);
                        renderizarListaCategorias();
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


