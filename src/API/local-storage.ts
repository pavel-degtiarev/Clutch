let clutchLocalStorage: Storage;
const LS_KEY = "car_title"

function storageAvailable() {
  try {
    const storage = window.localStorage,
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export function initLocalStorage(): void {
  if (storageAvailable()) {
    clutchLocalStorage = window.localStorage;
  } else {
    throw new Error("LocalStore unavailable");
  }
}

export function clearLS() {
  clutchLocalStorage.clear();
}

export function getTitleFromLS(): string {
  const value = clutchLocalStorage.getItem(LS_KEY);
  return value ? value : "";
}

export function setTitleToLS(newTitle: string): void {
  clutchLocalStorage.setItem(LS_KEY, newTitle);
}
