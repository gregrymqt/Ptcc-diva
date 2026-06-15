import { getStorageData, setStorageData } from "../../../core/storage.js";

export function getAboutImagesConfig() {
  return getStorageData("aboutImagesConfig");
}

export function setAboutImagesConfig(config) {
  setStorageData("aboutImagesConfig", config);
}
