import type React from 'react';
import styles from './ModalWindow.module.scss';
import cn from 'classnames';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
}

export const ModalWindow: React.FC<Props> = ({ isVisible, closeModal }) => {
  return (
    <div
      id="modal"
      className={cn(styles.modal, {
        [styles.hidden]: !isVisible,
      })}
    >
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
            onClick={closeModal}
          >
            CANCEL
          </button>
          <button
            className={cn(styles.modalControlBtn, styles.modalControlBtnApply)}
            onClick={closeModal}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};
