import { useEffect, useRef } from 'react';
import { logout, refreshToken } from '../api/auth';

const useKeepSession = () => {
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleRefresh = (expiresAt: number) => {
    const now = Date.now();
    const msBeforeExpire = expiresAt * 1000 - now;
    const msBeforeRefresh = msBeforeExpire - 60_000;

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    refreshTimeoutRef.current = setTimeout(async () => {
      try {
        const newExpiresAt = await refreshToken();
        scheduleRefresh(newExpiresAt);
      } catch (error) {
        console.error('Failed to refresh token', error);
        logout();
      }
    }, msBeforeRefresh);
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
