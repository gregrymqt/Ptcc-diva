import { getStorageData, setStorageData } from "../../../core/storage.js";

export function getHeroConfig() {
  return getStorageData("heroConfig");
}

export function setHeroConfig(config) {
  setStorageData("heroConfig", config);
}
