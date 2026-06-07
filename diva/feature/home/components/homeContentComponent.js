import { heroComponent }
from "./heroComponent.js";

import { categoryComponent }
from "./categoryComponent.js";

import { featuredProductsComponent }
from "./featuredProductsComponent.js";

export function homeContentComponent() {

    return `
        ${heroComponent()}
        ${categoryComponent()}
        ${featuredProductsComponent()}
    `;
}