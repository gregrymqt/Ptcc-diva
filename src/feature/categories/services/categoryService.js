import { getStorageData, setStorageData } from "../../../core/storage.js";

/* PEGAR TODAS CATEGORIAS */
export function getCategories() {
    return getStorageData("categories", []);
}

/* SALVAR TODAS CATEGORIAS */
function saveCategories(categories) {
    setStorageData("categories", categories);
}

/* CRIAR CATEGORIA */
export function createCategory(category) {
    if (!category || !category.nome || category.nome.trim() === "") {
        throw new Error("O nome da categoria não pode ser nulo ou vazio.");
    }

    var categories = getCategories();
    categories.push(category);
    saveCategories(categories);
}

/* BUSCAR CATEGORIA POR ID */
export function findCategoryById(id) {
    var categories = getCategories();

    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === id) {
            return categories[i];
        }
    }

    return null;
}

/* ATUALIZAR CATEGORIA */
export function updateCategory(id, updatedData) {
    var categories = getCategories();

    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === id) {
            for (var key in updatedData) {
                if (updatedData.hasOwnProperty(key)) {
                    categories[i][key] = updatedData[key];
                }
            }
            break;
        }
    }

    saveCategories(categories);
}

/* DELETAR CATEGORIA */
export function deleteCategory(id) {
    var categories = getCategories();
    var filteredCategories = [];

    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id !== id) {
            filteredCategories.push(categories[i]);
        }
    }

    saveCategories(filteredCategories);
}