import { useEffect, useState } from 'react';
import styles from './LogInPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { verifyEmail, logIn } from '../../api/auth';
import useIsAuthorized from '../../state/hooks/useIsAuthorized';
import { useMutation } from '@tanstack/react-query';
import AuthForm from './AuthForm/AuthForm';
import { useTranslation } from 'react-i18next';

const LogInPage = () => {
  const { t } = useTranslation();
  const isAuthorized = useIsAuthorized();
  const [currEmail, setCurrEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  }, []);

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (email: string) => {
      setCurrEmail(email);
    },
  });

  const logInMutation = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate('/', { replace: true });
    },
  });

  const handleCheckEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('emailInput') as string;

    verifyEmailMutation.mutate(email);
  };

  const handleCheckPassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get('passwordInput') as string;

    const params = {
      email: currEmail,
      password,
    };

    logInMutation.mutate(params);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleBackToEmail = () => {
    setCurrEmail('');
    verifyEmailMutation.reset();
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
          errorMessage={
            verifyEmailMutation.isError
              ? (verifyEmailMutation.error as Error).message
              : undefined
          }
          onSubmit={handleCheckEmail}
          onBack={goBack}
          submitBtnText={t('continue')}
        ></AuthForm>
      ) : (
        <AuthForm
          key="password"
          title={t('login')}
          fieldType="password"
          field={t('password')}
          placeholder={t('passwordInputPlaceholder')}
          errorMessage={
            logInMutation.isError
              ? (logInMutation.error as Error).message
              : undefined
          }
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
