import type { FilterStatusType } from '../types';

export const FILTER_STATUSES: {
  value: FilterStatusType;
}[] = [{ value: 'All' }, { value: 'Active' }, { value: 'Completed' }];

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'uk', label: 'Українська' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
  { value: 'pl', label: 'Polski' },
];

export const FIRST_PAGE = 1;

export const ITEMS_PER_PAGE = 5;

export const BASE_URL = 'http://localhost:3000';
