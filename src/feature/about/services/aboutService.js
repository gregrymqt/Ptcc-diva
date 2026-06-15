import { getStorageData } from "../../../core/storage.js";

export function getAboutImagesConfig() {
  return getStorageData("aboutImagesConfig");
}
