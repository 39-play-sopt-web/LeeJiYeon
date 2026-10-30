import { IMAGE_BASE_URL, IMAGE_SIZE } from '../constants/api';

export const getImageUrl = (
  path: string | null,
  size: keyof typeof IMAGE_SIZE,
): string | null => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${IMAGE_SIZE[size]}${path}`;
};

export const formatDate = (date: string): string => {
  if (!date) return '개봉일 미정';
  const [year, month, day] = date.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatVoteCount = (count: number): string => {
  return count.toLocaleString('ko-KR');
};

export const formatCurrency = (amount: number): string => {
  if (amount <= 0) return '정보 없음';
  return `$${amount.toLocaleString('en-US')}`;
};

export const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return '정보 없음';
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}분`;
  if (rest === 0) return `${hours}시간`;
  return `${hours}시간 ${rest}분`;
};

const languageNames = new Intl.DisplayNames(['ko'], { type: 'language' });
const regionNames = new Intl.DisplayNames(['ko'], { type: 'region' });

export const formatLanguage = (code: string): string => {
  try {
    return languageNames.of(code) ?? code;
  } catch {
    return code;
  }
};

export const formatCountry = (code: string): string => {
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
};

export const formatList = (items: string[]): string => {
  return items.length > 0 ? items.join(', ') : '정보 없음';
};

const STATUS_LABEL: Record<string, string> = {
  Rumored: '제작 소문',
  Planned: '제작 예정',
  'In Production': '제작 중',
  'Post Production': '후반 작업 중',
  Released: '개봉',
  Canceled: '제작 취소',
};

export const formatStatus = (status: string): string => {
  return STATUS_LABEL[status] ?? status;
};