import { getCategories } from "../../categories/services/categoryService.js";
import { getProductsWithCategory, createProduct, deleteProduct, updateProduct } from "../../products/services/productServices.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { productAdminListComponent } from "../../products/components/productAdminListComponent.js";
import { productFormComponent } from "../../products/components/productFormComponent.js";
import { productAdminDropdownItemComponent } from "../../products/components/productAdminDropdownComponent.js";

export function carregarModuloProdutos() {
    var formContainer = document.getElementById("admin-product-form-container");
    if (formContainer) {
        formContainer.innerHTML = productFormComponent();
    }

    var form = document.getElementById("product-form");
    
    // Configurar Dropdown Customizado de Categorias
    var categoryDropdownList = document.getElementById("category-dropdown-list");
    var categoryDropdownHeader = document.getElementById("category-dropdown-header");
    var selectedCategoryId = null;

    if (categoryDropdownList && categoryDropdownHeader) {
        var categorias = getCategories();
        var htmlCategorias = "";
        for (var i = 0; i < categorias.length; i++) {
            htmlCategorias += productAdminDropdownItemComponent(categorias[i]);
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
            var modoUso = document.getElementById("modoUso") ? document.getElementById("modoUso").value.trim() : "";
            var ingredientes = document.getElementById("ingredientes") ? document.getElementById("ingredientes").value.trim() : "";

            if (!nome || isNaN(preco) || !desc || !selectedCategoryId) {
                showToast("Preencha todos os campos obrigatórios, incluindo a categoria.", 3000);
                return;
            }

            var product = {
                nome: nome,
                preco: preco,
                descricao: desc,
                categoryId: selectedCategoryId,
                imagem: base64ProductImage || "",
                modoUso: modoUso,
                ingredientes: ingredientes
            };

            try {
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
            } catch (erro) {
                showToast(erro.message, 3000, "error");
            }
        });
    }

    var listContainer = document.getElementById("admin-products-list");
    if (listContainer) {
        listContainer.addEventListener("click", function(event) {
            var elementoClicado = event.target;
            
            if (elementoClicado.classList.contains("btn-delete-product")) {
                var idItem = elementoClicado.getAttribute("data-id");
                var produtos = getProductsWithCategory();
                var itemParaExcluir = null;
                for (var k = 0; k < produtos.length; k++) {
                    if (produtos[k].id == idItem) { itemParaExcluir = produtos[k]; break; }
                }
                
                if (window.exibirModalDelete) {
                    window.exibirModalDelete("Confirmar Exclusão", itemParaExcluir, "Tem certeza de que deseja remover este produto permanentemente?", function(objetoConfirmado) {
                        deleteProduct(objetoConfirmado.id);
                        showToast("Produto excluído!", 3000);
                        renderizarListaProdutos();
                    });
                } else if (confirm("Tem certeza que deseja excluir este produto?")) {
                    deleteProduct(idItem);
                    showToast("Produto excluído!", 3000);
                    renderizarListaProdutos();
                }
            }
            
            if (elementoClicado.classList.contains("btn-edit-product")) {
                var idItemEdit = elementoClicado.getAttribute("data-id");
                var produtosEdit = getProductsWithCategory();
                var itemParaEditar = null;
                for (var j = 0; j < produtosEdit.length; j++) {
                    if (produtosEdit[j].id == idItemEdit) { itemParaEditar = produtosEdit[j]; break; }
                }
                
                var camposConfig = [
                    { name: "nome", label: "Nome do Produto", type: "text" },
                    { name: "preco", label: "Preço", type: "number" },
                    { name: "descricao", label: "Descrição", type: "text" },
                    { name: "modoUso", label: "Modo de Uso", type: "text" },
                    { name: "ingredientes", label: "Ingredientes", type: "text" }
                ];
                
                if (window.exibirModalUpdate) {
                    window.exibirModalUpdate("Editar Produto", itemParaEditar, camposConfig, function(objetoAtualizado) {
                        try {
                            updateProduct(objetoAtualizado.id, objetoAtualizado);
                            showToast("Produto atualizado com sucesso!", 3000);
                            renderizarListaProdutos();
                        } catch (erro) {
                            showToast(erro.message, 3000, "error");
                        }
                    });
                }
            }
        });
    }

    renderizarListaProdutos();
}

function renderizarListaProdutos() {
    var produtos = getProductsWithCategory();
    var listContainer = document.getElementById("admin-products-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = productAdminListComponent(produtos);
}


