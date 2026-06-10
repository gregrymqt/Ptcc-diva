import { getCategories } from "../../categories/services/categoryService.js";
import { getProductsWithCategory, createProduct, deleteProduct } from "../../products/services/productServices.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";

export function carregarModuloProdutos() {
    var form = document.getElementById("product-form");
    
    // Configurar Dropdown Customizado de Categorias
    var categoryDropdownList = document.getElementById("category-dropdown-list");
    var categoryDropdownHeader = document.getElementById("category-dropdown-header");
    var selectedCategoryId = null;

    if (categoryDropdownList && categoryDropdownHeader) {
        var categorias = getCategories();
        var htmlCategorias = "";
        for (var i = 0; i < categorias.length; i++) {
            htmlCategorias += '<div class="dropdown-item" data-id="' + categorias[i].id + '">' + categorias[i].nome + '</div>';
        }
        categoryDropdownList.innerHTML = htmlCategorias;

        var items = categoryDropdownList.querySelectorAll('.dropdown-item');
        for (var j = 0; j < items.length; j++) {
            items[j].addEventListener("click", function(e) {
                var item = e.target;
                categoryDropdownHeader.textContent = item.textContent;
                selectedCategoryId = item.getAttribute("data-id");
                categoryDropdownList.style.display = "none";
            });
        }
        
        categoryDropdownHeader.addEventListener("click", function() {
            categoryDropdownList.style.display = categoryDropdownList.style.display === "block" ? "none" : "block";
        });
    }

    var imgInput = document.getElementById("product-image-input");
    var imgPreview = document.getElementById("product-image-preview");
    var uploadPlaceholder = document.getElementById("upload-placeholder");
    var base64ProductImage = null;

    if (imgInput) {
        imgInput.addEventListener("change", function(e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(evt) {
                    base64ProductImage = evt.target.result;
                    imgPreview.src = base64ProductImage;
                    imgPreview.style.display = "block";
                    if (uploadPlaceholder) uploadPlaceholder.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            var nome = document.getElementById("nome").value.trim();
            var preco = parseFloat(document.getElementById("preco").value);
            var desc = document.getElementById("descricao").value.trim();

            if (!nome || isNaN(preco) || !desc || !selectedCategoryId) {
                showToast("Preencha todos os campos, incluindo a categoria.", 3000, "error");
                return;
            }

            var product = {
                nome: nome,
                preco: preco,
                descricao: desc,
                categoryId: selectedCategoryId,
                imagem: base64ProductImage || ""
            };

            createProduct(product);
            showToast("Produto salvo!", 3000);
            form.reset();
            imgPreview.style.display = "none";
            imgPreview.src = "";
            if (uploadPlaceholder) uploadPlaceholder.style.display = "flex";
            categoryDropdownHeader.textContent = "Selecione ▼";
            selectedCategoryId = null;
            base64ProductImage = null;

            renderizarListaProdutos();
        });
    }

    renderizarListaProdutos();
}

function renderizarListaProdutos() {
    var produtos = getProductsWithCategory();
    var listContainer = document.getElementById("admin-products-list");
    if (!listContainer) return;
    
    if (produtos.length === 0) {
        listContainer.innerHTML = "<p style='color:#666;'>Nenhum produto cadastrado.</p>";
        return;
    }
    
    var html = '<table class="admin-table"><thead><tr><th>Imagem</th><th>Nome</th><th>Categoria</th><th>Preço</th><th>Ações</th></tr></thead><tbody>';
    for (var i = 0; i < produtos.length; i++) {
        var p = produtos[i];
        html += '<tr>' +
            '<td><img src="' + (p.imagem || 'https://via.placeholder.com/50') + '" width="50" height="50"></td>' +
            '<td>' + p.nome + '</td>' +
            '<td>' + p.categoryName + '</td>' +
            '<td>R$ ' + parseFloat(p.preco).toFixed(2).replace('.', ',') + '</td>' +
            '<td>' +
                '<button onclick="window.excluirProdutoAdmin(' + p.id + ')" class="btn-delete">Deletar</button>' +
            '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';
    listContainer.innerHTML = html;
}

window.excluirProdutoAdmin = function(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        deleteProduct(id);
        showToast("Produto excluído!", 3000);
        renderizarListaProdutos();
    }
};
