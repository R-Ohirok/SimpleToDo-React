import { CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import useKeepSession from '../../hooks/useAutoRefresh';
import useWorkspaces from '../../hooks/useWorkspaces';
import { joinWorkspace, createWorkspace } from '../../api/workspace';
import styles from './WorkspacesPage.module.scss';
import { useTranslation } from 'react-i18next';

const WorkspacePage = () => {
  useKeepSession();
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [userWorkspace, setUserWorkspace] = useState(
    Number(localStorage.getItem('workspaceId')) || null,
  );
  const { workspaces, isLoading, refetch } = useWorkspaces();

  const handleClick = useCallback(
    async (workspaceId: number) => {
      try {
        setIsPending(true);
        await joinWorkspace(workspaceId);
        setUserWorkspace(Number(localStorage.getItem('workspaceId')) || null);
        refetch();
      } catch (error) {
        console.error(error);
      } finally {
        setIsPending(false);
      }
    },
    [refetch],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const name = formData.get('nameInput') as string;

      try {
        setIsPending(true);
        await createWorkspace(name);
        setUserWorkspace(Number(localStorage.getItem('workspaceId')) || null);
        setValue('');
        refetch();
      } catch (err) {
        setErrorMessage(`${err}`);
      } finally {
        setIsPending(false);
      }
    },
    [refetch],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setValue(event.target.value);
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
    <>
      <header>
        <h1 className={styles.headerTitle}>{t('groups')}</h1>
      </header>
      <main className={styles.main}>
        <ul>
          {workspaces.map(workspace => (
            <div key={workspace.id} className={styles.workspace}>
              <h3> {workspace.name} </h3>
              {userWorkspace === workspace.id ? (
                <p>{t('joined')}</p>
              ) : (
                <button
                  className={styles.workspaceBtn}
                  onClick={() => handleClick(workspace.id)}
                >
                  {t('join')}
                </button>
              )}
            </div>
          ))}
        </ul>

        <form className={styles.createWorkspace} onSubmit={handleSubmit}>
          <div>
            <h2>{t('createGroup')}</h2>

            <label className={styles.createWorkspaceForm}>
              {t('enterGroupName')}:
              <input
                name="nameInput"
                aria-label="nameInput"
                className={styles.createWorkspaceFormInput}
                placeholder={t('groupNameInputPlaceholder')}
                value={value}
                onChange={handleChange}
                autoFocus
                required
              />
            </label>
          </div>

          <button
            className={styles.createWorkspaceFormBtn}
            type="submit"
            aria-label="createBtn"
          >
            {t('create')}
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </main>

      {isPending && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(25, 25, 25, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '5',
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default WorkspacePage;
