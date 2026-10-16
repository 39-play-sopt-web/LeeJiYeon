const STORAGE_KEY = 'ranking';

export const getRecords = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const saveRecord = (record) => {
  const records = getRecords();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...records, record]));
};

export const clearRecords = () => {
  localStorage.removeItem(STORAGE_KEY);
};