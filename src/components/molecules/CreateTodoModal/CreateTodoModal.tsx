import type React from 'react';
import styles from './CreateTodoModal.module.scss';
import cn from 'classnames';
import type { ToDoType } from '../../../types/ToDoType';
import { normalizeValue } from '../../../utils/normalizeValue';
import { useCallback, useId, useState } from 'react';

interface Props {
  onClose: () => void;
  сreateToDo: (newTodo: ToDoType) => void;
}

function getNewToDo(title: string): ToDoType {
  return {
    id: useId(),
    title: normalizeValue(title),
    isCompleted: false,
  };
}

const CreateTodoModal: React.FC<Props> = ({ onClose, сreateToDo }) => {
  const [value, setValue] = useState('');

  const onCreate = useCallback(() => {
    сreateToDo(getNewToDo(value));
    onClose();
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentTop}>
          <h2 className={styles.modalContentTitle}>NEW NOTE</h2>
          <input
            className={styles.modalContentInput}
            type="text"
            placeholder="Input your note..."
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className={styles.modalControl}>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnCancel)}
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnApply)}
            onClick={onCreate}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoModal;
