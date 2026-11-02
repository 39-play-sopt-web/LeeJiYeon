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

export const sortRecords = (records) =>
  [...records].sort((a, b) => {
    if (a.level !== b.level) return b.level - a.level;
    return a.playTime - b.playTime;
  });