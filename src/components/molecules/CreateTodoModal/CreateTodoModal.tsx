import type React from 'react';
import styles from './CreateTodoModal.module.scss';
import cn from 'classnames';

interface Props {
  onClose: () => void;
}

const CreateTodoModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div id="modal" className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentTop}>
          <h2 className={styles.modalContentTitle}>NEW NOTE</h2>
          <input
            className={styles.modalContentInput}
            type="text"
            id="noteInput"
            placeholder="Input your note..."
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
            onClick={onClose}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoModal;
