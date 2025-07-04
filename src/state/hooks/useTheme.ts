import { atom, useAtom } from 'jotai';
import type { ThemeType } from '../../types';

const initialState: ThemeType =
  (localStorage.getItem('theme') as ThemeType) || 'light';

const themeAtom = atom<ThemeType>(initialState);

const useTheme = (): [ThemeType, () => void] => {
  const [theme, setActiveTheme] = useAtom(themeAtom);

  document.documentElement.setAttribute('data-theme', theme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setActiveTheme(newTheme);
  };

  return [theme, toggleTheme];
};

export default useTheme;
