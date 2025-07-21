import { useEffect, useState } from 'react';
import styles from './LogInPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import useIsAuthorized from '../../state/hooks/useIsAuthorized';
import AuthForm from './AuthForm/AuthForm';
import { useTranslation } from 'react-i18next';
import { VERIFY_EMAIL } from '../../graphql/queries';
import { LOGIN } from '../../graphql/mutations';
import { saveTokens } from '../../utils/saveTokens';

const LogInPage = () => {
  const { t } = useTranslation();
  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();
  const [currEmail, setCurrEmail] = useState('');

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  }, [isAuthorized, navigate]);

  const [verifyEmail, { error: verifyEmailError }] = useLazyQuery(VERIFY_EMAIL, {
    onCompleted: (data) => {
      setCurrEmail(data.verifyEmail);
    },
    fetchPolicy: 'network-only',
  });

  const [login, { error: loginError }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      saveTokens(data.login);
      navigate('/', { replace: true });
    },
  });

  const handleCheckEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('emailInput') as string;

    verifyEmail({ variables: { email } });
  };

  const handleCheckPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get('passwordInput') as string;

    login({ variables: { email: currEmail, password } });
  };

  const goBack = () => navigate(-1);

  const handleBackToEmail = () => {
    setCurrEmail('');
  };

  return (
    <main className={styles.login}>
      {!currEmail ? (
        <AuthForm
          key="email"
          title={t('login')}
          field={t('email')}
          placeholder={t('emailInputPlaceholder')}
          fieldType="email"
          errorMessage={verifyEmailError?.message}
          onSubmit={handleCheckEmail}
          onBack={goBack}
          submitBtnText={t('continue')}
        />
      ) : (
        <AuthForm
          key="password"
          title={t('login')}
          fieldType="password"
          field={t('password')}
          placeholder={t('passwordInputPlaceholder')}
          errorMessage={loginError?.message}
          onSubmit={handleCheckPassword}
          onBack={handleBackToEmail}
          submitBtnText={t('login')}
          showEmail={currEmail}
        />
      )}
    </main>
  );
};

export default LogInPage;
