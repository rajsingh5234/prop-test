export const ACCESS_TOKEN = "test_access_token";
export const USER_DATA = "test_user_data";

export function getLocalStorageItem(key: string): unknown | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageItem(...keys: string[]): void {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
}
