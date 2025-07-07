import React from 'react';
import styles from './AuthForm.module.scss';

type Props = {
  title: string;
  field: 'email' | 'password';
  submitBtnText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  showEmail?: string;
  errorMessage?: string;
  children?: React.ReactNode;
};

const AuthForm: React.FC<Props> = ({
  title,
  field,
  errorMessage,
  submitBtnText,
  showEmail,
  onSubmit,
  onBack,
  children,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {showEmail && <p>{showEmail}</p>}

        <div className={styles.fields}>
          <label className={styles.label}>
            {field}:
            <input
              className={styles.input}
              name={`${field}Input`}
              type={field}
              placeholder={`Enter ${field}`}
              autoFocus
              required
            />
          </label>

          {errorMessage && <p className={styles.message}>{errorMessage}</p>}
        </div>
      </div>

      <div className={styles.control}>
        <div className={styles.controlBtns}>
          <button className={styles.controlBtn} type="button" onClick={onBack}>
            Back
          </button>

          <button className={styles.controlBtn} type="submit">
            {submitBtnText}
          </button>
        </div>

        {children}
      </div>
    </form>
  );
};

export default AuthForm;