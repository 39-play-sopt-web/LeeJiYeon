import type { Part } from '../types/auth';

export const PART_OPTIONS: { value: Part; label: string }[] = [
  { value: 'WEB', label: 'WEB' },
  { value: 'IOS', label: 'iOS' },
  { value: 'ANDROID', label: 'ANDROID' },
];

export const isPart = (value: string): value is Part =>
  PART_OPTIONS.some((option) => option.value === value);

export const getPartLabel = (part: Part) =>
  PART_OPTIONS.find((option) => option.value === part)?.label ?? part;