import { useCallback, useState } from 'react';
import i18n from '../i18n';
import type { LanguageType } from '../types';

const initialState: LanguageType =
  (localStorage.getItem('language') as LanguageType) || 'en';

const useLanguage = (): [LanguageType, (lng: LanguageType) => void] => {
  const [ currentLanguage, setCurrentLanguage ] = useState(initialState);

  const changeLanguage: (lng: LanguageType) => void = useCallback((lng: LanguageType) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setCurrentLanguage(lng as LanguageType)
  }, []);

  return [ currentLanguage, changeLanguage ];
};

export default useLanguage;