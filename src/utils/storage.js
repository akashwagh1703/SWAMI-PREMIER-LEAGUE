// Session Storage utilities
export const saveToSession = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to session storage:', error);
  }
};

export const getFromSession = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from session storage:', error);
    return null;
  }
};

export const removeFromSession = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from session storage:', error);
  }
};

// IndexedDB utilities
const DB_NAME = 'TournamentDB';
const DB_VERSION = 1;
const STORE_NAME = 'registrations';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('companyName', 'companyName', { unique: false });
        store.createIndex('submittedAt', 'submittedAt', { unique: false });
      }
    };
  });
};

export const saveToIndexedDB = async (data) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await store.put(data);
    return true;
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
    return false;
  }
};

export const getAllFromIndexedDB = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error reading from IndexedDB:', error);
    return [];
  }
};

export const deleteFromIndexedDB = async (id) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await store.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting from IndexedDB:', error);
    return false;
  }
};
