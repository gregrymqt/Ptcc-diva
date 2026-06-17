export function homeFormComponent() {
    return `
        <div class="admin-section admin-form-wrapper">
            <h2>Configuração da Seção Hero</h2>
            <form id="hero-form" class="admin-form">
                <div class="form-group">
                    <label for="hero-title">Título Principal</label>
                    <input type="text" id="hero-title" placeholder="Ex: Nova Coleção" required />
                </div>
                <div class="form-group">
                    <label for="hero-subtitle">Subtítulo</label>
                    <input type="text" id="hero-subtitle" placeholder="Ex: Descubra as novidades" required />
                </div>
                <div class="form-group">
                    <label for="hero-button-text">Texto do Botão</label>
                    <input type="text" id="hero-button-text" placeholder="Ex: Comprar Agora" />
                </div>
                <div class="form-group">
                    <label for="hero-button-link">Link do Botão</label>
                    <input type="text" id="hero-button-link" placeholder="Ex: /produtos" />
                </div>
                <div class="form-group">
                    <label for="hero-image">Imagem do Banner</label>
                    <input type="file" id="hero-image" accept="image/*" />
                </div>
                <div id="image-preview" class="image-preview-container"></div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Salvar Hero</button>
                </div>
            </form>
        </div>
    `;
}
