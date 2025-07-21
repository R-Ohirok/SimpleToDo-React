import './index.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useIsAuthorized from './state/hooks/useIsAuthorized';
import { useTranslation } from 'react-i18next';
import Dropdown from './components/atoms/Dropdown/Dropdown';
import type { DropdownOptionType, LanguageType } from './types';
import { LANGUAGES } from './constants/constants';
import { useCallback, useId } from 'react';
import useLanguage from './hooks/useLanguage';
import { useMutation } from '@apollo/client';
import { LOGOUT } from './graphql/mutations';
import { clearTokens } from './utils/clearTokens';

function App() {
  const { t } = useTranslation();
  const [currentLanguage, changeLanguage] = useLanguage();

  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();

  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => {
      clearTokens();
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  const onLogOut = async () => {
    try {
      await logoutMutation();
    } catch {
    }
  };

  const languageOptions: DropdownOptionType[] = LANGUAGES.map(lang => {
    return { id: useId(), value: lang.value, label: lang.label };
  });

  const handleLanguageChange = useCallback((newLanguage: string) => {
    changeLanguage(newLanguage as LanguageType);
  }, []);

  return (
    <div className="app">
      <div
        style={{
          width: '80%',
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
          marginTop: '20px',
          marginInline: 'auto',
        }}
      >
        <Dropdown
          options={languageOptions}
          value={currentLanguage as string}
          onChange={handleLanguageChange}
        />
        {!isAuthorized ? (
          <>
            <Link to="/signup">{t('signUp')}</Link>
            <Link to="/login">{t('login')}</Link>
          </>
        ) : (
          <>
            <Link to="/">ToDos</Link>
            <Link to="/workspaces">{t('groups')}</Link>
            <button onClick={onLogOut}>{t('logout')}</button>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
