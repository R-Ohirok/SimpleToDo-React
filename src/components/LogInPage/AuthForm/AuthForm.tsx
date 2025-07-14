import React from 'react';
import styles from './AuthForm.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  fieldType: 'email' | 'password';
  field: string;
  placeholder: string;
  submitBtnText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  showEmail?: string;
  errorMessage?: string;
};

const AuthForm: React.FC<Props> = ({
  title,
  fieldType,
  field,
  placeholder,
  errorMessage,
  submitBtnText,
  showEmail,
  onSubmit,
  onBack,
}) => {
  const { t } = useTranslation();

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {showEmail && <p>{showEmail}</p>}

        <div className={styles.fields}>
          <label className={styles.label}>
            {field}:
            <input
              aria-label={`${fieldType}Input`}
              className={styles.input}
              name={`${fieldType}Input`}
              type={fieldType}
              placeholder={placeholder}
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
            {t('back')}
          </button>

          <button className={styles.controlBtn} type="submit">
            {submitBtnText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
