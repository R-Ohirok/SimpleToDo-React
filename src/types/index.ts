export type FilterStatusType = 'All' | 'Active' | 'Completed';

export type LanguageType = 'en' | 'uk' | 'fr' | 'es' | 'pl';

export type DropdownOptionType = {
  id: string;
  value: string;
  label: string;
};

export type ToDoType = {
  id: string;
  title: string;
  isCompleted: boolean;
  workspaceId?: number;
};

export type ThemeType = 'dark' | 'light';

export type SearchParams = {
  [key: string]: string | null;
};

export type TodosParams = {
  status: FilterStatusType;
  title: string;
  limit: number;
  offset: number;
};

export type TodosResponse = {
  todos: ToDoType[];
  pagesCount: number;
  activePage: number;
};

export type RegisterParams = {
  email: string;
  password: string;
};

export type LogInParams = {
  email: string;
  password: string;
};

export type WorkspaceType = {
  id: number;
  name: string;
};
