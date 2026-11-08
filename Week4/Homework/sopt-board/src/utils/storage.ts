import type { Part } from '../types/auth';

const AUTH_CODE_KEY = 'authorizationCode';
const PART_KEY = 'part';

export const storage = {
  getAuthCode: () => localStorage.getItem(AUTH_CODE_KEY),
  setAuthCode: (code: string) => localStorage.setItem(AUTH_CODE_KEY, code),

  getPart: () => localStorage.getItem(PART_KEY) as Part | null,
  setPart: (part: Part) => localStorage.setItem(PART_KEY, part),

  clear: () => {
    localStorage.removeItem(AUTH_CODE_KEY);
    localStorage.removeItem(PART_KEY);
  },
};