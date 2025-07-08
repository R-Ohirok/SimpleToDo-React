import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const initialState: boolean =
  Boolean(localStorage.getItem('isAuthorized')) || false;

const AuthorizeAtom = atom<boolean>(initialState);

const useIsAuthorized = (): boolean => {

  const [isAuthorized, setIsAuthorized] = useAtom<boolean>(AuthorizeAtom);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthorized(!!token);
  }, []);

  return isAuthorized;
};

export default useIsAuthorized;
