import { getStorageData, setStorageData } from "../../../core/storage.js";

/**
 * Obtém todas as categorias.
 * @returns {Array} Lista de categorias cadastradas.
 */
export function getCategories() {
    return getStorageData("categories", []);
}

/**
 * Salva a lista completa de categorias no LocalStorage.
 * Boa Prática (Tratamento de Erros): O try/catch previne que um eventual
 * estouro de cota (QuotaExceededError) quebre silenciosamente a gravação.
 * @param {Array} categories 
 */
function saveCategories(categories) {
    try {
        setStorageData("categories", categories);
    } catch (e) {
        console.error("Erro crítico ao salvar as categorias:", e);
        throw new Error("Não foi possível salvar. O espaço de armazenamento pode estar cheio.");
    }
}

/**
 * Valida os dados mínimos e salva uma nova categoria.
 */
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