import type React from 'react';
import styles from './CreateTodoModal.module.scss';
import cn from 'classnames';
import { generateId } from '../../../utils/generateId';
import type { ToDoType } from '../../../types/ToDoType';
import { normalizeValue } from '../../../utils/normalizeValue';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onCreateNewTodo: (newTodo: ToDoType) => void;
}

function createTodo(title: string): ToDoType {
  return {
    id: generateId(),
    title: normalizeValue(title),
    isCompleted: false,
  };
}

const CreateTodoModal: React.FC<Props> = ({ onClose, onCreateNewTodo }) => {
  const [query, setQuery] = useState('');
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentTop}>
          <h2 className={styles.modalContentTitle}>NEW NOTE</h2>
          <input
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
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnApply)}
            onClick={() => {
              onCreateNewTodo(createTodo(query));
              onClose();
            }}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoModal;
