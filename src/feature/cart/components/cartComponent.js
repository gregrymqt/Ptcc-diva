import { cartItemComponent } from "./cartItemComponent.js";

export function cartComponent(items) {
  // Se o carrinho estiver vazio
  if (items.length === 0) {
    return (
      '<section class="cart">' +
        '<h2>Carrinho</h2>' +
        '<p>Seu carrinho está vazio.</p>' +
      '</section>'
    );
  }

  var total = 0;
  var htmlLista = "";

  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    // 1. Cálculo do Total
    total = total + (item.preco * item.quantidade);

    // 2. Renderização da Lista de Itens usando o componente filho
    htmlLista = htmlLista + cartItemComponent(item);
  }

  // 3. Retorno do HTML concatenado
  return (
    '<section class="cart">' +
      '<h2>Meu Carrinho</h2>' +
      '<div class="cart-list">' +
        htmlLista +
      '</div>' +
      '<div class="cart-total">' +
        '<h3>Total: R$ ' + total.toFixed(2) + '</h3>' +
      '</div>' +
    '</section>'
  );
}