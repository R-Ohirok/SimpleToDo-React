import { useEffect, useState } from 'react';
import styles from './SignUpPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import useIsAuthorized from '../../state/hooks/useIsAuthorized';

const SignUpPage = () => {
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
      navigate('/', { replace: true });
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
          <h2 className={styles.registerTitle}>Register</h2>

          <div className={styles.fields}>
            <label className={styles.label}>
              Email:
              <input
                className={styles.input}
                name="emailInput"
                type="email"
                placeholder="Enter email"
                autoFocus
                required
              />
            </label>

            <label className={styles.label}>
              Password:
              <input
                className={styles.input}
                name="passwordInput"
                type="password"
                placeholder="Enter password"
                required
              />
            </label>

            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>

        <div className={styles.control}>
          <button className={styles.controlBtn} type="button" onClick={goBack}>
            Back
          </button>
          <button className={styles.controlBtn} type="submit">
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpPage;
