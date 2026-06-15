export class Product {

  constructor(
    id,
    nome,
    preco,
    descricao,
    imagem,
    categoryId,
    modoUso,
    ingredientes
  ) {

    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.imagem = imagem;
    this.categoryId = categoryId;
    this.modoUso = modoUso;
    this.ingredientes = ingredientes;
  }

}