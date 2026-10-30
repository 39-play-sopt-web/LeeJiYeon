export interface RatingFilterOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export const DEFAULT_RATING_FILTER: RatingFilterOption = {
  id: 'all',
  label: '전체',
};

export const RATING_FILTERS: RatingFilterOption[] = [
  DEFAULT_RATING_FILTER,
  { id: '9', label: '9점 이상', min: 9 },
  { id: '8', label: '8~9점', min: 8, max: 8.99 },
  { id: '7', label: '7~8점', min: 7, max: 7.99 },
  { id: '6', label: '6~7점', min: 6, max: 6.99 },
  { id: 'under6', label: '6점 미만', max: 5.99 },
];

export const MIN_VOTE_COUNT = 100;