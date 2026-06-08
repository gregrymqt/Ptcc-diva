import { getCategories }
from "./services/categoryService.js";

import { renderCategories }
from "./components/categoryComponent.js";

const categories =
  getCategories();

renderCategories(
  categories,
  "categories-container"
);