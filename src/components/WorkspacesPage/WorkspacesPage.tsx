import { CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import useKeepSession from '../../hooks/useAutoRefresh';
import useWorkspaces from '../../hooks/useWorkspaces';
import useUserWorkspaces from '../../hooks/useUserWorkspaces';
import {
  addUserToWorkspace,
  createWorkspace,
  removeUserFromWorkspace,
} from '../../api/workspace';
import { t } from 'i18next';

const WorkspacePage = () => {
  useKeepSession();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');
  const {
    workspaces,
    isLoading: isWorkspacesLoading,
    refetch: refetchWorkspaces,
  } = useWorkspaces();
  const {
    userWorkspaces,
    isLoading: isUserWorkspacesLoading,
    refetch: refetchUserWorkspaces,
  } = useUserWorkspaces();

  const userWorkspacesIds = userWorkspaces.map(workspace => workspace.id);

  const isUserInWorkspace = (workspaceId: number) => {
    return userWorkspacesIds.includes(workspaceId);
  };

  const handleClick = useCallback(async (workspaceId: number) => {
    setIsPending(true);
    isUserInWorkspace(workspaceId)
      ? await removeUserFromWorkspace(workspaceId)
      : await addUserToWorkspace(workspaceId);
    setIsPending(false);
    refetchUserWorkspaces();
    refetchWorkspaces();
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const name = formData.get('nameInput') as string;

      try {
        setIsPending(true);
        await createWorkspace(name);
        refetchUserWorkspaces();
        refetchWorkspaces();
      } catch (err) {
        setMessage(`${err}`);
      } finally {
        setIsPending(false);
      }
    },
    [],
  );

  if (isWorkspacesLoading || isUserWorkspacesLoading) {
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
      <h1>{t('workspaces')}</h1>
      <main>
        <div>
          <ul>
            {workspaces.map(workspace => (
              <div key={workspace.id}>
                <p> {workspace.name} </p>
                <button onClick={() => handleClick(workspace.id)}>
                  {isUserInWorkspace(workspace.id) ? t('leave') : t('join')}
                </button>
              </div>
            ))}
          </ul>

          <form onSubmit={handleSubmit}>
            <div>
              <h2>{t('createWorkspace')}</h2>

              <div>
                <label>
                  {t('enterWorkspaceName')}:
                  <input
                    name="nameInput"
                    aria-label="nameInput"
                    placeholder={t('workspaceNameInputPlaceholder')}
                    autoFocus
                    required
                  />
                </label>
              </div>
            </div>

            <button type="submit" aria-label="createBtn">
              {t('create')}
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
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
