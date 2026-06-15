import { getStorageData, setStorageData } from "../../../core/storage.js";

var CHAVE_CARRINHO = "carrinho";

export function getCart() {
    return getStorageData(CHAVE_CARRINHO, []);
}

export function addToCart(produto, quantidade) {
    var cart = getCart();
    var encontrado = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == produto.id) {
            cart[i].quantidade += quantidade;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        var novoItem = {};
        for (var prop in produto) {
            if (produto.hasOwnProperty(prop)) {
                novoItem[prop] = produto[prop];
            }
        }
        novoItem.quantidade = quantidade;
        cart.push(novoItem);
    }

    setStorageData(CHAVE_CARRINHO, cart);
}

export function updateCartQuantity(produtoId, novaQuantidade) {
    var cart = getCart();

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == produtoId) {
            if (novaQuantidade <= 0) {
                cart.splice(i, 1);
            } else {
                cart[i].quantidade = novaQuantidade;
            }
            break;
        }
    }

    setStorageData(CHAVE_CARRINHO, cart);
}

export function removeFromCart(produtoId) {
    var cart = getCart();

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == produtoId) {
            cart.splice(i, 1);
            break;
        }
    }

    setStorageData(CHAVE_CARRINHO, cart);
}

export function clearCart() {
    setStorageData(CHAVE_CARRINHO, []);
}

export function getCartTotal() {
    var cart = getCart();
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        total += cart[i].preco * cart[i].quantidade;
    }

    return total;
}

export function getCartCount() {
    var cart = getCart();
    var count = 0;

    for (var i = 0; i < cart.length; i++) {
        count += cart[i].quantidade;
    }

    return count;
}