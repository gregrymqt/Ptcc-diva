import { heroComponent } from "./heroComponent.js";
import { categoryComponent } from "./categoryComponent.js";
import { VitrineComponent } from "./VitrineComponent.js";

export async function homeContentComponent() {
    const vitrineHtml = await VitrineComponent();
    
    return `
        ${heroComponent()}
        ${categoryComponent()}
        ${vitrineHtml}
    `;
}