import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const initialState: boolean =
  Boolean(localStorage.getItem('accessToken')) || false;

const AuthorizeAtom = atom<boolean>(initialState);

const useIsAuthorized = (): boolean => {

  const [isAuthorized, setIsAuthorized] = useAtom<boolean>(AuthorizeAtom);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthorized(!!accessToken);
  }, []);

  return isAuthorized;
};

export default useIsAuthorized;
