import { useEffect, useState } from 'react';
import styles from './SignUpPage.module.scss';
import { useNavigate } from 'react-router-dom';
import useIsAuthorized from '../../state/hooks/useIsAuthorized';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';

const SignUpPage = () => {
  const { t } = useTranslation();
  const isAuthorized = useIsAuthorized();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [registerUser, { loading: isLoading }] = useMutation(REGISTER_USER);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  }, [isAuthorized, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('emailInput') as string;
    const password = formData.get('passwordInput') as string;

    try {
      await registerUser({
        variables: { email, password },
      });
      navigate('/login', { replace: true });
    } catch (err: any) {
      setMessage(err.message || 'Unknown error');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className={styles.register}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <div>
          <h2 className={styles.registerTitle}>{t('register')}</h2>

          <div className={styles.fields}>
            <label className={styles.label}>
              {t('email')}:
              <input
                className={styles.input}
                name="emailInput"
                aria-label="emailInput"
                type="email"
                placeholder={t('emailInputPlaceholder')}
                autoFocus
                required
                disabled={isLoading}
              />
            </label>

            <label className={styles.label}>
              {t('password')}:
              <input
                className={styles.input}
                name="passwordInput"
                aria-label="passwordInput"
                type="password"
                placeholder={t('passwordInputPlaceholder')}
                required
                disabled={isLoading}
              />
            </label>

            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>

        <div className={styles.control}>
          <button
            className={styles.controlBtn}
            type="button"
            onClick={goBack}
            aria-label="backBtn"
            disabled={isLoading}
          >
            {t('back')}
          </button>
          <button
            className={styles.controlBtn}
            type="submit"
            aria-label="registerBtn"
            disabled={isLoading}
          >
            {t('register')}
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpPage;
