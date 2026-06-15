import { getCategories, createCategory, deleteCategory } from "../../categories/services/categoryService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";

export function carregarModuloCategorias() {
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
    
    if (categorias.length === 0) {
        listContainer.innerHTML = "<p style='color:#666;'>Nenhuma categoria cadastrada.</p>";
        return;
    }
    
    var html = '<table class="admin-table"><thead><tr><th>Imagem</th><th>Nome</th><th>Ações</th></tr></thead><tbody>';
    for (var i = 0; i < categorias.length; i++) {
        var cat = categorias[i];
        html += '<tr>' +
            '<td><img src="' + (cat.imagem || 'https://via.placeholder.com/50') + '" width="50" height="50"></td>' +
            '<td>' + cat.nome + '</td>' +
            '<td>' +
                '<button onclick="window.excluirCategoriaAdmin(' + cat.id + ')" class="btn-delete">Deletar</button>' +
            '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';
    listContainer.innerHTML = html;
}

window.excluirCategoriaAdmin = function(id) {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
        deleteCategory(id);
        showToast("Categoria excluída!", 3000);
        renderizarListaCategorias();
    }
};
