import { Favorite } from "../models/favoriteModel.js";

import {
  getProducts
}
from "../../products/services/productService.js";

const STORAGE_KEY = "favorites";

/* LISTAR FAVORITOS */

export function getFavorites() {

  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || [];

}

/* ADICIONAR FAVORITO */

export function createFavorite(
  productId
) {

  const favorites =
    getFavorites();

  const newFavorite =
    new Favorite(
      Date.now(),
      productId
    );

  favorites.push(
    newFavorite
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );

}

/* BUSCAR FAVORITO */

export function findFavoriteById(
  id
) {

  const favorites =
    getFavorites();

  return favorites.find(
    favorite => favorite.id === id
  );

}

/* REMOVER FAVORITO */

export function deleteFavorite(
  id
) {

  const favorites =
    getFavorites();

  const updatedFavorites =
    favorites.filter(
      favorite => favorite.id !== id
    );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedFavorites)
  );

}

/* VERIFICAR FAVORITO */

export function isFavorite(
  productId
) {

  const favorites =
    getFavorites();

  return favorites.some(
    favorite =>
      favorite.productId === productId
  );

}

/* TOGGLE */

export function toggleFavorite(
  productId
) {

  const favorites =
    getFavorites();

  const existingFavorite =
    favorites.find(
      favorite =>
        favorite.productId === productId
    );

  if (existingFavorite) {

    const updatedFavorites =
      favorites.filter(
        favorite =>
          favorite.productId !== productId
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        updatedFavorites
      )
    );

    return;
  }

  const newFavorite =
    new Favorite(
      Date.now(),
      productId
    );

  favorites.push(
    newFavorite
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );

}

/* JOIN FAVORITOS + PRODUTOS */

export function getFavoriteProducts() {

  const favorites =
    getFavorites();

  const products =
    getProducts();

  return favorites
    .map(favorite => {

      const product =
        products.find(
          product =>
            product.id === favorite.productId
        );

      return product || null;

    })
    .filter(Boolean);

}