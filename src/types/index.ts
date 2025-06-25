export type FilterStatusType = 'All' | 'Active' | 'Completed';

export type DropdownOptionType = {
  id: string;
  label: FilterStatusType;
}

export type ToDoType = {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type ThemeType = 'dark' | 'light';

export type SearchParams = {
  [key: string]: string | null;
};