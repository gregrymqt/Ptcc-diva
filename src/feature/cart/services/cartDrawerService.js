import { getStorageData, setStorageData } from "../../../core/storage.js";

var CHAVE_CARRINHO = "carrinho";

export function pegarCarrinho() {
  return getStorageData(CHAVE_CARRINHO, []);
}

export function salvarCarrinho(itens) {
  setStorageData(CHAVE_CARRINHO, itens);
  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(produto, corSelecionada) {
  var carrinho = pegarCarrinho();
  var itemExistente = null;
  var indiceExistente = -1;

  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === produto.id && carrinho[i].corSelecionada === corSelecionada) {
      itemExistente = carrinho[i];
      indiceExistente = i;
    }
  }

  if (indiceExistente !== -1) {
    carrinho[indiceExistente].quantidade = carrinho[indiceExistente].quantidade + 1;
  } else {
    var imagemDoProduto = "https://via.placeholder.com/600x600?text=Sem+Imagem";

    if (produto.variacoes) {
      for (var v = 0; v < produto.variacoes.length; v++) {
        if (produto.variacoes[v].cor === corSelecionada) {
          imagemDoProduto = produto.variacoes[v].imagem;
        }
      }
    }

    var novoItem = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: imagemDoProduto,
      corSelecionada: corSelecionada,
      quantidade: 1
    };

    carrinho.push(novoItem);
  }

  salvarCarrinho(carrinho);
}

export function atualizarQuantidade(produtoId, cor, novaQuantidade) {
  if (novaQuantidade < 1) {
    return;
  }

  var carrinho = pegarCarrinho();

  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id == produtoId && carrinho[i].corSelecionada === cor) {
      carrinho[i].quantidade = novaQuantidade;
    }
  }

  salvarCarrinho(carrinho);
}

export function removerDoCarrinho(produtoId, cor) {
  var carrinho = pegarCarrinho();
  var carrinhoAtualizado = [];

  for (var i = 0; i < carrinho.length; i++) {
    var mesmoId = carrinho[i].id == produtoId;
    var mesmaCor = carrinho[i].corSelecionada === cor;

    if (!(mesmoId && mesmaCor)) {
      carrinhoAtualizado.push(carrinho[i]);
    }
  }

  salvarCarrinho(carrinhoAtualizado);
}

export function calcularTotais() {
  var carrinho = pegarCarrinho();
  var totalItens = 0;
  var totalValor = 0;

  for (var i = 0; i < carrinho.length; i++) {
    totalItens = totalItens + carrinho[i].quantidade;
    totalValor = totalValor + (carrinho[i].preco * carrinho[i].quantidade);
  }

  return { totalItens: totalItens, totalValor: totalValor };
}

export function clearCart() {
  setStorageData(CHAVE_CARRINHO, []);
  window.dispatchEvent(new Event("cartUpdated"));
}
