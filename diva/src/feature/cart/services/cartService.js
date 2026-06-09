import { Cart } from "../models/cartModel.js";
import { getProducts } from "../../products/services/productServices.js";

const STORAGE_KEY = "cart";

export function getCartItems() {

  const cart = localStorage.getItem(STORAGE_KEY);

  return cart ? JSON.parse(cart) : [];

}

function saveCart(cart) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cart)
  );

}

export function findCartItemById(id) {

  return getCartItems().find(
    item => item.id === Number(id)
  );

}

export function addToCart(productId) {

  const cart = getCartItems();

  const existingItem = cart.find(
    item => item.productId === Number(productId)
  );

  if (existingItem) {

    existingItem.quantidade++;

  } else {

    const newItem = new Cart(
      Date.now(),
      Number(productId),
      1
    );

    cart.push(newItem);

  }

  saveCart(cart);

}

export function increaseQuantity(cartItemId) {

  const cart = getCartItems();

  const item = cart.find(
    item => item.id === Number(cartItemId)
  );

  if (!item) return;

  item.quantidade++;

  saveCart(cart);

}

export function decreaseQuantity(cartItemId) {

  const cart = getCartItems();

  const item = cart.find(
    item => item.id === Number(cartItemId)
  );

  if (!item) return;

  if (item.quantidade > 1) {

    item.quantidade--;

  } else {

    const updatedCart = cart.filter(
      item => item.id !== Number(cartItemId)
    );

    saveCart(updatedCart);

    return;

  }

  saveCart(cart);

}

export function removeCartItem(cartItemId) {

  const cart = getCartItems();

  const updatedCart = cart.filter(
    item => item.id !== Number(cartItemId)
  );

  saveCart(updatedCart);

}

export function clearCart() {

  localStorage.removeItem(STORAGE_KEY);

}

export function getCartProducts() {

  const cart = getCartItems();

  const products = getProducts();

  return cart.map(cartItem => {

    const product = products.find(
      product => product.id === cartItem.productId
    );

    return {
      ...cartItem,
      nome: product?.nome,
      preco: product?.preco,
      descricao: product?.descricao,
      imagem: product?.imagem
    };

  });

}