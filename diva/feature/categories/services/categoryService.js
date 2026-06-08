const STORAGE_KEY = "categories";

/* PEGAR TODAS CATEGORIAS */
export function getCategories() {

    const categories =
        localStorage.getItem(STORAGE_KEY);

    return categories
        ? JSON.parse(categories)
        : [];

}

/* SALVAR TODAS CATEGORIAS */
function saveCategories(categories) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(categories)
    );

}

/* CRIAR CATEGORIA */
export function createCategory(category) {

    const categories =
        getCategories();

    categories.push(category);

    saveCategories(categories);

}

/* BUSCAR CATEGORIA POR ID */
export function findCategoryById(id) {

    const categories =
        getCategories();

    return categories.find(
        category => category.id === id
    );

}

/* ATUALIZAR CATEGORIA */
export function updateCategory(
    id,
    updatedData
) {

    const categories =
        getCategories();

    const updatedCategories =
        categories.map(category => {

            if (category.id === id) {

                return {
                    ...category,
                    ...updatedData
                };

            }

            return category;

        });

    saveCategories(updatedCategories);

}

/* DELETAR CATEGORIA */
export function deleteCategory(id) {

    const categories =
        getCategories();

    const filteredCategories =
        categories.filter(
            category => category.id !== id
        );

    saveCategories(filteredCategories);

}