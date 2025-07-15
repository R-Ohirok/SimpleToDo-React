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
  const [value, setValue] = useState('');

  const getNewToDo = useCallback((title: string): ToDoType => {
    return {
      id: generateId(),
      title: normalizeValue(title),
      isCompleted: false,
    };
  }, []);

  const onCreate = () => {
    if (value.trim()) {
      onCreateToDo(getNewToDo(value));
    }

    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentTop}>
          <h2 className={styles.modalContentTitle}>NEW NOTE</h2>
          <input
            name="modalContentInput"
            aria-label='modalContentInput'
            className={styles.modalContentInput}
            type="text"
            placeholder={t('modalContentInputPlaceholder')}
            value={value}
            autoFocus
            onChange={handleChange}
          />
        </div>
        <div className={styles.modalControl}>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnCancel)}
            onClick={onClose}
            aria-label='cancel'
          >
            {t('cancel')}
          </button>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnApply)}
            onClick={onCreate}
            aria-label='create'
          >
            {t('create')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoModal;
