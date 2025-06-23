import { atom, useAtom } from 'jotai';
import type { ThemeType } from '../../types';

const themeAtom = atom<ThemeType>('light');

const useSwitchTheme = () => {
  const [activeTheme, setActiveTheme] = useAtom(themeAtom);

  const changeActiveTheme = () => {
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    setActiveTheme(newTheme);
  };

  return {
    activeTheme,
    changeActiveTheme,
  };
};

export default useSwitchTheme;
