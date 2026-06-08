export class Product {

  constructor(
    id,
    nome,
    preco,
    descricao,
    imagem,
    categoryId
  ) {

    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.imagem = imagem;
    this.categoryId = categoryId;
  }

}