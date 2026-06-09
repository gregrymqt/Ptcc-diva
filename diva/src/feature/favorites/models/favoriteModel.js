export class Favorite {

  constructor(
    id,
    productId
  ) {

    this.id = id;
    this.productId = productId;

  }

}

export function getFavorites() {

  const favorites =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  return favorites;

}

export function findFavoriteById(id) {

  const favorites = getFavorites();

  return favorites.find(
    favorite => favorite.id === id
  );

}

export function isFavorite(productId) {

  const favorites = getFavorites();

  return favorites.some(
    favorite => favorite.productId === productId
  );

}

export function toggleFavorite(productId) {

  const favorites = getFavorites();

  const favoriteExists = favorites.find(
    favorite => favorite.productId === productId
  );

  if (favoriteExists) {

    const updatedFavorites = favorites.filter(
      favorite => favorite.productId !== productId
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );

    return;

  }

  const newFavorite = new Favorite(
    Date.now(),
    productId
  );

  favorites.push(newFavorite);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );

}