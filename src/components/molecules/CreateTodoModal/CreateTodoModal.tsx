import type React from 'react';
import styles from './CreateTodoModal.module.scss';
import cn from 'classnames';
import { normalizeValue } from '../../../utils/normalizeValue';
import { useCallback, useState } from 'react';
import type { ToDoType } from '../../../types';
import generateId from '../../../utils/generateId';
import { useTranslation } from 'react-i18next';
import useUserWorkspaces from '../../../hooks/useUserWorkspaces';
import { CircularProgress } from '@mui/material';

interface Props {
  onClose: () => void;
  onCreateToDo: (newTodo: ToDoType) => void;
}

const CreateTodoModal: React.FC<Props> = ({ onClose, onCreateToDo }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number>(0);

  const { userWorkspaces, isLoading } = useUserWorkspaces();

  const getNewToDo = useCallback(
    (title: string, workspaceId: number): ToDoType => {
      return {
        id: generateId(),
        title: normalizeValue(title),
        isCompleted: false,
        workspaceId,
      };
    },
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      console.log(title);
      console.log(selectedWorkspaceId);
      event.preventDefault();
      try {
        await onCreateToDo(getNewToDo(title, selectedWorkspaceId));
        onClose();

      } catch {}
    };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

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
              <div className={styles.options}>
              {t('selectGroup')}
              <div className={styles.option}>
                {userWorkspaces.map(workspace => (
                  <label key={workspace.id}>
                    <input
                      type="radio"
                      name="option"
                      value={workspace.id}
                      checked={selectedWorkspaceId === workspace.id}
                      onChange={() => setSelectedWorkspaceId(workspace.id)}
                      required
                    />
                    {workspace.name}
                  </label>
                ))}
              </div>
              </div>
            </div>
          </div>

          <div className={styles.modalControl}>
            <button
              className={cn(
                styles.modalControlBtn,
                styles.modalControlBtnCancel,
              )}
              onClick={onClose}
              type="button"
              aria-label="cancel"
            >
              {t('cancel')}
            </button>
            <button
              className={cn(
                styles.modalControlBtn,
                styles.modalControlBtnApply,
              )}
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
