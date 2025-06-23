export type FilterStatusType = 'All' | 'Active' | 'Completed';

export interface DropdownOptionType {
  id: string;
  label: FilterStatusType;
}

export interface ToDoType {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type ThemeType = 'dark' | 'light';

export type SearchParams = {
  [key: string]: string | null;
};