import { heroComponent } from "./heroComponent.js";
import { categoryComponent } from "../../categories/components/categoryComponent.js";
import { VitrineComponent } from "../../products/components/VitrineComponent.js";

export async function homeContentComponent() {
    const vitrineHtml = await VitrineComponent();
    
    return `
        ${heroComponent()}
        ${categoryComponent()}
        ${vitrineHtml}
    `;
}