export const LOCAL_STORAGE_TOKEN_KEY = 'authToken';

export const getStoredAuthToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

export const storeAuthToken = token => localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

export const removeStoredAuthToken = () => localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
