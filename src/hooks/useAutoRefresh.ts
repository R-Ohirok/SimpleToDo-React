import { useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import { LOGOUT, REFRESH_TOKEN } from '../graphql/mutations';
import { clearTokens } from '../utils/clearTokens';
import { useNavigate } from 'react-router-dom';

const useKeepSession = () => {
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await client.mutate({ mutation: LOGOUT });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
      navigate('/login', { replace: true });
    }
  };

  const scheduleRefresh = (expiresAt: number) => {
    const now = Date.now();
    const msBeforeExpire = expiresAt * 1000 - now;
    const msBeforeRefresh = msBeforeExpire - 60_000;

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    if (msBeforeRefresh <= 0) {
      refreshToken();
      return;
    }

    refreshTimeoutRef.current = setTimeout(() => {
      refreshToken();
    }, msBeforeRefresh);
  };

  const refreshToken = async () => {
    try {
      const { data } = await client.query({
        query: REFRESH_TOKEN,
        fetchPolicy: 'network-only',
      });

      if (data?.refresh) {
        const { accessToken, expiresAt, workspaceId } = data.refresh;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiresAt', expiresAt.toString());
        if (workspaceId !== undefined) {
          localStorage.setItem('workspaceId', workspaceId.toString());
        }

        scheduleRefresh(expiresAt);
      } else {
        throw new Error('No refresh data');
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      await logout();
    }
  };

  useEffect(() => {
    const expiresAtStr = localStorage.getItem('expiresAt');
    if (!expiresAtStr) return;

    const expiresAt = Number(expiresAtStr);
    if (isNaN(expiresAt)) return;

    scheduleRefresh(expiresAt);

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);
};

export default useKeepSession;
