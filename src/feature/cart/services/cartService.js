import { getStorageData, setStorageData } from "../../../core/storage.js";

var CHAVE_CARRINHO = "carrinho";

/**
 * Recupera os itens do carrinho salvos em Local Storage.
 * Boa Prática (SoC): A persistência de dados ocorre unicamente aqui.
 */
export function getCart() {
    return getStorageData(CHAVE_CARRINHO, []);
}

/**
 * Adiciona um novo produto ao carrinho ou incrementa sua quantidade.
 */
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

/**
 * Atualiza explicitamente a quantidade de um item no carrinho.
 */
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

/**
 * Remove um item completamente do carrinho.
 */
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