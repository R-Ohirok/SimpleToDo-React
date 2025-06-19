import type React from 'react';
import styles from './ModalWindow.module.scss';
import cn from 'classnames';
import { generateId } from '../../../utils/generateId';
import type { ToDoType } from '../../../types/ToDoType';
import { normalizeValue } from '../../../utils/normalizeValue';
import { useState } from 'react';

interface Props {
  closeModal: () => void;
  addNewTodo: (newTodo: ToDoType) => void;
}

function createTodo(title: string): ToDoType {
  return {
    id: generateId(),
    title: normalizeValue(title),
    isCompleted: false,
  };
}

export const ModalWindow: React.FC<Props> = ({ closeModal, addNewTodo }) => {
  const [query, setQuery] = useState('');

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentTop}>
          <h2 className={styles.modalContentTitle}>NEW NOTE</h2>
          <input
            name="modalContentInput"
            className={styles.modalContentInput}
            type="text"
            placeholder="Input your note..."
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </div>
        <div className={styles.modalControl}>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnCancel)}
            onClick={closeModal}
          >
            CANCEL
          </button>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnApply)}
            onClick={() => {
              addNewTodo(createTodo(query));
              closeModal();
            }}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};
