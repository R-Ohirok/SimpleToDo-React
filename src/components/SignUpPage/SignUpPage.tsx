import { useEffect, useState } from 'react';
import styles from './SignUpPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import useIsAuthorized from '../../state/hooks/useIsAuthorized';
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const { t } = useTranslation();
  const isAuthorized = useIsAuthorized();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('emailInput') as string;
    const password = formData.get('passwordInput') as string;

    const params = {
      email,
      password,
    };

    try {
      await registerUser(params);
      navigate('/login', { replace: true });
    } catch (err) {
      setMessage(`${err}`);
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
          >
            {t('back')}
          </button>
          <button
            className={styles.controlBtn}
            type="submit"
            aria-label="registerBtn"
          >
            {t('register')}
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpPage;
