import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WorkspacesPage.module.scss';
import { useQuery, useMutation } from '@apollo/client';

import useKeepSession from '../../hooks/useAutoRefresh';
import { GET_ALL_WORKSPACES } from '../../graphql/queries';
import { CREATE_WORKSPACE, JOIN_WORKSPACE } from '../../graphql/mutations';
import type { WorkspaceType } from '../../types';
import { saveTokens } from '../../utils/saveTokens';

const WorkspacePage = () => {
  useKeepSession();
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  const [userWorkspace, setUserWorkspace] = useState<number | null>(
    Number(localStorage.getItem('workspaceId')) || null,
  );

  const { data, loading: isLoading, refetch } = useQuery(GET_ALL_WORKSPACES);

  const [joinWorkspace, { loading: joinLoading }] = useMutation(JOIN_WORKSPACE, {
    onCompleted: data => {
      saveTokens(data.joinWorkspace);
      setUserWorkspace(Number(localStorage.getItem('workspaceId')) || null);
      refetch();
    },
    onError: error => {
      console.error(error);
      setErrorMessage(error.message);
    },
  });

  const [createWorkspace, { loading: createLoading }] = useMutation(
    CREATE_WORKSPACE,
    {
      onCompleted: data => {
        saveTokens(data.createWorkspace);
        setUserWorkspace(Number(localStorage.getItem('workspaceId')) || null);        setValue('');
        refetch();
      },
      onError: error => {
        setErrorMessage(error.message);
      },
    },
  );

  const handleJoin = (workspaceId: number) => {
    setErrorMessage('');
    joinWorkspace({ variables: { workspaceId } });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    createWorkspace({ variables: { name: value } });
  };

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

  const workspaces = data?.allWorkspaces ?? [];

  const isPending = joinLoading || createLoading;

  return (
    <>
      <header>
        <h1 className={styles.headerTitle}>{t('groups')}</h1>
      </header>
      <main className={styles.main}>
        <ul>
          {workspaces.map((workspace: WorkspaceType) => (
            <div key={workspace.id} className={styles.workspace}>
              <h3> {workspace.name} </h3>
              {userWorkspace === +workspace.id ? (
                <p>{t('joined')}</p>
              ) : (
                <button
                className={styles.workspaceBtn}
                onClick={() => handleJoin(Number(workspace.id))}
                disabled={isPending}
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
                disabled={isPending}
              />
            </label>
          </div>

          <button
            className={styles.createWorkspaceFormBtn}
            type="submit"
            aria-label="createBtn"
            disabled={isPending}
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