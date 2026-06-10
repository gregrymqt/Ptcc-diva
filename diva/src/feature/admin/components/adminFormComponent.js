export function adminFormComponent() {
    return (
        '<section class="admin-section">' +
            '<h2>Configuração da Home (Hero)</h2>' +
            '<form id="hero-form" class="admin-form">' +
                '<div class="form-group">' +
                    '<label for="hero-title">Título Principal</label>' +
                    '<input type="text" id="hero-title" placeholder="Ex: Desperte a diva que vive em você" required>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="hero-subtitle">Subtítulo (Texto de Apoio)</label>' +
                    '<input type="text" id="hero-subtitle" placeholder="Ex: Produtos premium de maquiagem..." required>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="hero-image">Imagem do Banner</label>' +
                    '<input type="file" id="hero-image" accept="image/*">' +
                    '<div id="image-preview" class="image-preview">' +
                        '<!-- Preview da imagem aparecerá aqui -->' +
                    '</div>' +
                '</div>' +
                '<button type="submit" class="btn-primary">Adicionar Slide</button>' +
            '</form>' +
        '</section>'
    );
}
