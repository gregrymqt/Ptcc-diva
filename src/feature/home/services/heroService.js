import { getStorageData } from "../../../core/storage.js";

export function getHeroConfig() {
  return getStorageData("heroConfig");
}
