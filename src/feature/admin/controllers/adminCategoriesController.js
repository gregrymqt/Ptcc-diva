import { getCategories, createCategory, deleteCategory } from "../../categories/services/categoryService.js";
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
        form.addEventListener("submit", function(e) {
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
                reader.onload = function(evt) {
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

    renderizarListaCategorias();
}

function renderizarListaCategorias() {
    var categorias = getCategories();
    var listContainer = document.getElementById("admin-categories-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = categoryAdminListComponent(categorias);
}

window.excluirCategoriaAdmin = function(id) {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
        deleteCategory(id);
        showToast("Categoria excluída!", 3000);
        renderizarListaCategorias();
    }
};
