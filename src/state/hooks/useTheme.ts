import { atom, useAtom } from 'jotai';
import type { ThemeType } from '../../types';

const themeAtom = atom<ThemeType>('light');

const useTheme = () => {
  const [theme, setActiveTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    setActiveTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
