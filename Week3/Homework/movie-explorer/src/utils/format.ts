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