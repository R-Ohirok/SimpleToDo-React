import type React from 'react';
import styles from './CreateTodoModal.module.scss';
import cn from 'classnames';
import { normalizeValue } from '../../../utils/normalizeValue';
import { useCallback, useState } from 'react';
import type { ToDoType } from '../../../types';
import generateId from '../../../utils/generateId';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
  onCreateToDo: (newTodo: ToDoType) => void;
}

const CreateTodoModal: React.FC<Props> = ({ onClose, onCreateToDo }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const getNewToDo = useCallback((title: string): ToDoType => {
    return {
      id: generateId(),
      title: normalizeValue(title),
      isCompleted: false,
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onCreateToDo(getNewToDo(title));
      onClose();
    } catch (err) {
      setMessage(`${err}`);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className={styles.modal}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <div className={styles.modalContentTop}>
          <h2 className={styles.modalContentTitle}>{t('newNote')}</h2>

          <div className={styles.fields}>
            <input
              name="modalContentInput"
              aria-label="modalContentInput"
              className={styles.modalContentInput}
              type="text"
              placeholder={t('modalContentInputPlaceholder')}
              value={title}
              autoFocus
              onChange={handleChange}
              required
            />
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.modalControl}>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnCancel)}
            onClick={onClose}
            type="button"
            aria-label="cancel"
          >
            {t('cancel')}
          </button>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnApply)}
            type="submit"
            aria-label="create"
          >
            {t('create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodoModal;
