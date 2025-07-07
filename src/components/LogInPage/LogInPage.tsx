import { useState } from 'react';
import styles from './LogInPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { findUser, logIn } from '../../api/auth';
import useIsAuthorized from '../../state/hooks/useIsAuthorized';

const LogInPage = () => {
  const [isAuthorized, setIsAuthorized] = useIsAuthorized();
  const [message, setMessage] = useState('');
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [currEmail, setCurrEmail] = useState('');
  const navigate = useNavigate();

  const handleCheckEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage('');
    const formData = new FormData(event.currentTarget);
    const email = formData.get('emailInput') as string;

    try {
      await findUser(email);
      setIsEmailExist(true);
      setCurrEmail(email);
    } catch (err) {
      setMessage(`${err}`);
    }
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

    try {
      await logIn(params);
      setIsAuthorized();
    } catch (err) {
      setMessage(`${err}`);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleBackToEmail = () => {
    setIsEmailExist(false);
    setCurrEmail('');
    setMessage('');
  };

  if (isAuthorized) {
    return (
      <div>
        Already authorized
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <main className={styles.login}>
      {!isEmailExist ? (
        <form className={styles.loginForm} onSubmit={handleCheckEmail}>
        <div>
          <h2 className={styles.loginTitle}>LogIn</h2>

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

            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>

        <div className={styles.control}>
          <div className={styles.controlBtns}>
            <button className={styles.controlBtn} type="button" onClick={goBack}>
              Back
            </button>
            <button className={styles.controlBtn} type="submit">
              Continue
            </button>
          </div>
          <Link to="/signup">SignUp</Link>
        </div>
      </form>
      ) : (
        <form className={styles.loginForm} onSubmit={handleCheckPassword}>
        <div>
          <h2 className={styles.loginTitle}>LogIn</h2>
          <p>{currEmail}</p>

          <div className={styles.fields}>
            <label className={styles.label}>
              Password:
              <input
                className={styles.input}
                name="passwordInput"
                type="password"
                placeholder="Enter password"
                autoFocus
                required
              />
            </label>

            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>

        <div className={styles.controlBtns}>
            <button className={styles.controlBtn} type="button" onClick={handleBackToEmail}>
              Back
            </button>
            <button className={styles.controlBtn} type="submit">
              logIn
            </button>
          </div>
      </form>
      )}
      
    </main>
  );
};

export default LogInPage;
